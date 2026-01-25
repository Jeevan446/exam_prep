import XLSX from "xlsx";
import SetModel from "../models/set.model.js";
import Question from "../models/question.model.js";
import fs from "fs";



// Run every 10 minutes and check only live set
// if endtime is greater or equal to 1hrs then setType change to free

cron.schedule("*/10 * * * *", async () => {
  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000); 

  // Find sets that have live exams whose endTime was more than 1 hour ago
  const sets = await Set.find({
    "exams.setType": "live",
    "exams.endTime": { $lte: oneHourAgo },
  });

  for (let set of sets) {
    let changed = false;

    set.exams = set.exams.map((exam) => {
      // Only update live exams
      if (exam.setType === "live" && exam.endTime <= oneHourAgo) {
        exam.setType = "free";
        changed = true;
      }
      return exam;
    });

    if (changed) {
      await set.save();
      console.log(`Updated live exams in Set ${set._id} to free`);
    }
  }
});


// uploadExamSet using ExCel from Frontend

export const uploadExamSet = async (req, res) => {
  const filePath = req.file?.path;

  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No Excel file uploaded" });
    }

    const createdBy = req.user._id;
    const { examType, examTime, fullMarks, setType, startTime, endTime } =
      req.body;

    //  STRICTURE TIME VALIDATION (ONLY FOR LIVE EXAMS)
    if (setType === "live") {
      if (!startTime || !endTime) {
        throw new Error("Start and End times are required for live exams.");
      }
      const start = new Date(startTime);
      const end = new Date(endTime);
      const durationInMinutes = Math.round((end - start) / (1000 * 60));

      if (durationInMinutes !== Number(examTime)) {
        throw new Error(
          `Time Mismatch: Window is ${durationInMinutes} mins, but duration is ${examTime} mins.`,
        );
      }
    }

    //  READ EXCEL
    const workbook = XLSX.readFile(filePath);
    const rows = XLSX.utils.sheet_to_json(
      workbook.Sheets[workbook.SheetNames[0]],
    );

    if (!rows.length) throw new Error("Excel file is empty");

    const setsMap = {};
    const questionOperations = [];

    //  ROW-BY-ROW VALIDATION
    for (const [index, row] of rows.entries()) {
      const rowNum = index + 2;

      // Strict ExamType Check: Excel vs Form
      const rowExamType = row.examType ? String(row.examType).trim() : null;
      if (rowExamType !== String(examType).trim()) {
        throw new Error(
          `Row ${rowNum}: Excel Type "${rowExamType}" does not match Form selection "${examType}"`,
        );
      }

      // Prepare Question Data
      questionOperations.push({
        updateOne: {
          filter: {
            name: String(row.questionName).trim(),
            examType: examType.trim(),
          },
          update: {
            $set: {
              subject: row.subject || "General",
              chapter: row.chapter || "General",
              level: row.level || "Medium",
              marks: Number(row.marks) || 1,
              options: String(row.options)
                .split(",")
                .map((o) => o.trim()),
              answer: String(row.answer).trim(),
              creator: createdBy,
            },
          },
          upsert: true,
        },
      });

      // Group into Sets
      const setKey = `${row.setName}_${examType}`;
      if (!setsMap[setKey]) {
        // Check DB for duplicates
        const exists = await SetModel.findOne({
          name: row.setName,
          "exams.examType": examType,
        });
        if (exists)
          throw new Error(
            `Set "${row.setName}" already exists for ${examType}`,
          );

        setsMap[setKey] = {
          name: row.setName,
          createdBy,
          exams: [
            {
              examType,
              examTime: Number(examTime),
              fullMarks: Number(fullMarks),
              setType,
              startTime: setType === "live" ? new Date(startTime) : undefined,
              endTime: setType === "live" ? new Date(endTime) : undefined,
              questions: [],
            },
          ],
        };
      }
    }

    // 4. EXECUTE DB OPS
    await Question.bulkWrite(questionOperations);
    const dbQuestions = await Question.find({
      name: { $in: rows.map((r) => String(r.questionName).trim()) },
      examType,
    });

    for (const row of rows) {
      const setKey = `${row.setName}_${examType}`;
      const q = dbQuestions.find(
        (q) => q.name === String(row.questionName).trim(),
      );
      if (q && !setsMap[setKey].exams[0].questions.includes(q._id)) {
        setsMap[setKey].exams[0].questions.push(q._id);
      }
    }

    await SetModel.insertMany(Object.values(setsMap));
    res.status(201).json({ success: true, message: "Upload successful!" });
  } catch (error) {
    console.error("CRITICAL ERROR:", error.message);
    res.status(400).json({ success: false, message: error.message });
  } finally {
    if (filePath && fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }
};



/* ================= 2. GET QUESTIONS BY SET ================= */
export const getQuestionsBySet = async (req, res) => {
  try {
    const { setId } = req.params;
    const requestedExamType = req.query.examType?.trim();

    // Populate the questions inside the exams array
    const set = await SetModel.findById(setId).populate("exams.questions");
    if (!set)
      return res.status(404).json({ success: false, message: "Set not found" });

    // Find the specific exam configuration (e.g., IOE or CEE) within that set
    let examConfig = requestedExamType
      ? set.exams.find((e) => e.examType === requestedExamType)
      : set.exams[0];

    if (!examConfig) {
      return res
        .status(404)
        .json({ success: false, message: "Exam type not found in this set" });
    }

    // Grouping questions by Subject for the Frontend UI
    const subjectsMap = {};
    examConfig.questions.forEach((q) => {
      const subj = q.subject || "General";
      if (!subjectsMap[subj]) subjectsMap[subj] = [];
      subjectsMap[subj].push(q);
    });

    const groupedBySubject = Object.keys(subjectsMap).map((subj) => ({
      subject: subj,
      questions: subjectsMap[subj],
    }));

    res.status(200).json({
      success: true,
      setName: set.name,
      examType: examConfig.examType,
      examTime: examConfig.examTime,
      fullMarks: examConfig.fullMarks,
      subjects: groupedBySubject,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================= 3. GET UNIQUE EXAM TYPES ================= */
export const getUniqueExamTypes = async (req, res) => {
  try {
    // Get unique examType strings from the nested exams array
    const result = await SetModel.distinct("exams.examType");

    res.status(200).json({
      success: true,
      total: result.length,
      examTypes: result, // Returns e.g. ["IOE", "CEE", "NEB"]
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ========== GET SETS BY EXAM TYPE & SET TYPE (WITH LIVE TIME) ========== */
export const getSetsByExamTypeAndSetType = async (req, res) => {
  try {
    const { examType, setType } = req.params;

    const pipeline = [
      { $unwind: "$exams" },
      {
        $match: {
          "exams.examType": examType,
          ...(setType && { "exams.setType": setType }),
        },
      },
      {
        $project: {
          setId: "$_id",
          setName: "$name",
          examType: "$exams.examType",
          setType: "$exams.setType",

          // show only if live
          startTime: {
            $cond: [
              { $eq: ["$exams.setType", "live"] },
              "$exams.startTime",
              null,
            ],
          },
          endTime: {
            $cond: [
              { $eq: ["$exams.setType", "live"] },
              "$exams.endTime",
              null,
            ],
          },
        },
      },
    ];

    const sets = await SetModel.aggregate(pipeline);

    res.status(200).json({
      success: true,
      examType,
      setType: setType || "all",
      totalSets: sets.length,
      sets,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
