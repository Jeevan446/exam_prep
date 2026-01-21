import XLSX from "xlsx";
import SetModel from "../models/set.model.js"; 
import Question from "../models/question.model.js";
import fs from "fs";

export const uploadExamSet = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No Excel file uploaded",
      });
    }

    const createdBy = req.user._id;
    const { examType, examTime, fullMarks, setType, startTime, endTime } = req.body;

    //  Validate required fields
    if (!examType || !examTime || !fullMarks || !setType) {
      return res.status(400).json({
        success: false,
        message: "Missing required exam configuration",
      });
    }

    //  Live exam validation
    if (setType === "live" && (!startTime || !endTime)) {
      return res.status(400).json({
        success: false,
        message: "Live exams require startTime and endTime",
      });
    }

    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    if (!rows.length) {
      return res.status(400).json({
        success: false,
        message: "Excel file is empty",
      });
    }

    const setsMap = {};
    const usedSetNames = new Set();

    for (const row of rows) {
      const { setName, questionName, options, answer, subject, chapter, level, marks } = row;

      if (!setName || !questionName || !options || !answer) continue;

      //  Ensure unique setName
      if (usedSetNames.has(setName)) {
        return res.status(400).json({
          success: false,
          message: `Duplicate setName found: ${setName}`,
        });
      }
      usedSetNames.add(setName);

      // Split options
      const optionsArray = String(options)
        .split(",")
        .map((o) => o.trim());

      // Upsert question
      const question = await Question.findOneAndUpdate(
        { name: questionName.trim() },
        {
          name: questionName.trim(),
          examType,
          subject: subject || "General",
          chapter: chapter || "General",
          level: level || "Medium",
          marks: Number(marks) || 1,
          options: optionsArray,
          answer: String(answer).trim(),
        },
        { upsert: true, new: true }
      );

      // Initialize set if not exists
      if (!setsMap[setName]) {
        //  Prevent overwriting existing sets
        const exists = await SetModel.findOne({ name: setName });
        if (exists) {
          return res.status(400).json({
            success: false,
            message: `Set already exists: ${setName}`,
          });
        }

        setsMap[setName] = {
          name: setName,
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

      // Add question ID
      setsMap[setName].exams[0].questions.push(question._id);
    }

    // Save sets
    await SetModel.insertMany(Object.values(setsMap));

    // Cleanup
    fs.existsSync(req.file.path) && fs.unlinkSync(req.file.path);

    res.status(201).json({
      success: true,
      message: "Exam sets uploaded successfully",
      totalSets: Object.keys(setsMap).length,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* ================= 2. GET QUESTIONS BY SET ================= */
export const getQuestionsBySet = async (req, res) => {
  try {
    const { setId } = req.params;
    const requestedExamType = req.query.examType?.trim();

    // Populate the questions inside the exams array
    const set = await SetModel.findById(setId).populate("exams.questions");
    if (!set) return res.status(404).json({ success: false, message: "Set not found" });

    // Find the specific exam configuration (e.g., IOE or CEE) within that set
    let examConfig = requestedExamType 
      ? set.exams.find(e => e.examType === requestedExamType) 
      : set.exams[0];

    if (!examConfig) {
      return res.status(404).json({ success: false, message: "Exam type not found in this set" });
    }

    // Grouping questions by Subject for the Frontend UI
    const subjectsMap = {};
    examConfig.questions.forEach(q => {
      const subj = q.subject || "General";
      if (!subjectsMap[subj]) subjectsMap[subj] = [];
      subjectsMap[subj].push(q);
    });

    const groupedBySubject = Object.keys(subjectsMap).map(subj => ({
      subject: subj,
      questions: subjectsMap[subj]
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
