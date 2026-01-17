import XLSX from "xlsx";
import SetModel from "../models/set.model.js"; 
import Question from "../models/question.model.js";
import fs from "fs";


export const uploadExamSet = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No Excel file uploaded" });
    }

    const createdBy = req.user._id;
    const { examType, examTime, fullMarks, setType, startTime, endTime } = req.body;

    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    if (!rows || rows.length === 0) {
      return res.status(400).json({ success: false, message: "Excel file is empty" });
    }

    const setsMap = {};

    for (const row of rows) {
      const { setName, questionName, subject, chapter, level, marks, options, answer } = row;

      if (!setName || !questionName || !options || !answer) continue;

      // Handle options: split by comma and trim
      const optionsArray = String(options).split(",").map(o => o.trim());

      // Upsert Question (prevents duplicates, updates existing)
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

      // Group questions by setName
      if (!setsMap[setName]) {
        setsMap[setName] = {
          name: setName,
          createdBy,
          exams: [{
            examType,
            examTime: Number(examTime),
            fullMarks: Number(fullMarks),
            setType,
            startTime: setType === "live" ? new Date(startTime) : null,
            endTime: setType === "live" ? new Date(endTime) : null,
            questions: []
          }]
        };
      }

      // Add question ID if not already in the array
      if (!setsMap[setName].exams[0].questions.includes(question._id)) {
        setsMap[setName].exams[0].questions.push(question._id);
      }
    }

    // Save/Update Sets in Database
    const setEntries = Object.values(setsMap);
    for (const setData of setEntries) {
      await SetModel.findOneAndUpdate(
        { name: setData.name },
        setData,
        { upsert: true }
      );
    }

    // Clean up temporary file
    if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);

    res.status(201).json({ success: true, message: "Data processed successfully" });

  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ success: false, message: error.message });
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

/* ================= 4. GET SETS BY EXAM TYPE ================= */
export const getSetsByExamType = async (req, res) => {
  try {
    const { examType } = req.params;

    // Find sets that contain the specified exam type in their exams array
    const sets = await SetModel.find({ "exams.examType": examType })
      .select("name exams.setType exams.examType");

    const setList = sets.map(set => {
      // Find the specific exam info for the requested type
      const specificExam = set.exams.find(e => e.examType === examType);
      return {
        setId: set._id,
        setName: set.name,
        setType: specificExam?.setType
      };
    });

    res.status(200).json({ 
      success: true, 
      examType, 
      totalSets: setList.length, 
      sets: setList 
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};