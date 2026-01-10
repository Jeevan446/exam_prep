const XLSX = require("xlsx");
const Set = require("../models/set.model");
const Question = require("../models/question.model");

const uploadExamSet = async (req, res) => {
  try {
    // 1️⃣ Check if file is uploaded
    if (!req.file)
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });

    // 2️⃣ Check if user info exists (createdBy)
    const createdBy = req.user ? req.user._id : null;
    if (!createdBy)
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No user info found",
      });

    // 3️⃣ Read Excel file
    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    if (!rows.length)
      return res
        .status(400)
        .json({ success: false, message: "Excel is empty" });

    const setsMap = {};


    for (const row of rows) {
      const {
        setName,
        examType,
        fullMarks,
        examTime,
        questionName,
        subject,
        chapter,
        level,
        marks,
        options,
        answer,
      } = row;

      // Safety checks
      if (!setName || !examType || !questionName)
        return res.status(400).json({
          success: false,
          message: `Missing required data in row: ${JSON.stringify(row)}`,
        });

      if (!options || !answer)
        return res.status(400).json({
          success: false,
          message: `Options or answer missing for question: ${questionName}`,
        });

      //  Create set in map if not exists
      if (!setsMap[setName]) {
        setsMap[setName] = { name: setName, exams: [] };
      }

      //  Create or find question
      let question = await Question.findOne({ name: questionName });
      if (!question) {
        question = await Question.create({
          name: questionName,
          examtype: examType,
          subject,
          chapter,
          level,
          marks: Number(marks),
          options: options
            ? String(options)
                .split(",")
                .map((o) => o.trim())
            : [],
          answer:
            answer !== undefined && answer !== null
              ? String(answer).trim()
              : "",
        });
      }

      //  Add exam to set
      let exam = setsMap[setName].exams.find((e) => e.examType === examType);
      if (!exam) {
        exam = {
          examType,
          fullMarks: Number(fullMarks),
          examTime: Number(examTime),
          questions: [],
        };
        setsMap[setName].exams.push(exam);
      }

      // Add question _id to exam
      exam.questions.push(question._id);
    }

    // Convert map to array and attach createdBy
    const finalSets = Object.values(setsMap).map((s) => ({
      ...s,
      createdBy,
    }));

    //  Save all sets to DB
    const savedSets = await Set.insertMany(finalSets);

    res.json({ success: true, savedSets });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};



const getSetsByExamType = async (req, res) => {
  try {
    const examType = req.params.examType?.trim().toLowerCase();

    if (!examType) {
      return res.status(400).json({
        success: false,
        message: "examType is required",
      });
    }

    const sets = await Set.find({
      "exams.examType": examType,
    }).populate("exams.questions");

    // NO DATA CASE
    if (!sets.length) {
      return res.status(200).json({
        success: true,
        examType,
        totalSets: 0,
        sets: [],
        message: "No sets found for this exam type",
      });
    }

    const result = [];

    for (const set of sets) {
      const exam = set.exams.find(
        (e) => e.examType?.toLowerCase() === examType
      );

      // Extra safety
      if (!exam) continue;

      result.push({
        setId: set._id,
        setName: set.name,
        createdBy: set.createdBy,
        exam: {
          examType: exam.examType,
          examTime: exam.examTime,
          fullMarks: exam.fullMarks,
          totalQuestions: exam.questions.length,
          questions: exam.questions,
        },
      });
    }

    res.status(200).json({
      success: true,
      examType,
      totalSets: result.length,
      sets: result,
    });

  } catch (error) {
    console.error("GET EXAM ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};



//get UniqueExamTypes

const getUniqueExamTypes = async (req, res) => {
  try {
    const result = await Set.aggregate([
      { $unwind: "$exams" },
      {
        $group: {
          _id: null,
          examTypes: { $addToSet: "$exams.examType" }
        }
      },
      {
        $project: {
          _id: 0,
          examTypes: 1
        }
      }
    ]);

    // If no data in DB
    if (!result.length) {
      return res.status(200).json({
        success: true,
        examTypes: [],
        message: "No exam types found"
      });
    }

    res.status(200).json({
      success: true,
      total: result[0].examTypes.length,
      examTypes: result[0].examTypes
    });

  } catch (error) {
    console.error("GET UNIQUE EXAM TYPES ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};


const getSetNamesByExamType = async (req, res) => {
  try {
    const examType = req.params.examType?.trim().toLowerCase();

    if (!examType) {
      return res.status(400).json({
        success: false,
        message: "examType is required",
      });
    }

    // Find all sets that have this examType
    const sets = await Set.find({
      "exams.examType": examType,
    });

    if (!sets.length) {
      return res.status(200).json({
        success: true,
        examType,
        totalSets: 0,
        setNames: [],
        message: "No sets found for this exam type",
      });
    }

    // Extract set names
    const setNames = sets.map((set) => set.name);

    res.status(200).json({
      success: true,
      examType,
      totalSets: setNames.length,
      setNames,
    });

  } catch (error) {
    console.error("GET SET NAMES ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//question Fetch according to set id

const getQuestionsBySet = async (req, res) => {
  try {
    const setId = req.params.setId;
    const examType = req.query.examType?.trim().toLowerCase(); // optional query

    if (!setId) return res.status(400).json({ success: false, message: "setId required" });

    const set = await Set.findById(setId).populate("exams.questions");

    if (!set) return res.status(404).json({ success: false, message: "Set not found" });

    // Find exam inside set
    let exam;
    if (examType) {
      exam = set.exams.find(e => e.examType?.toLowerCase() === examType);
    } else {
      exam = set.exams[0]; // fallback to first exam if examType not provided
    }

    if (!exam) return res.status(404).json({ success: false, message: "Exam type not found in this set" });

    // Group questions by subject
    const subjectsMap = {};
    exam.questions.forEach(q => {
      const subj = q.subject.trim();
      if (!subjectsMap[subj]) subjectsMap[subj] = [];
      subjectsMap[subj].push(q);
    });

    // Sort each subject by marks ascending
    const subjects = Object.keys(subjectsMap).map(subj => ({
      subject: subj,
      questions: subjectsMap[subj].sort((a, b) => a.marks - b.marks)
    }));

    res.status(200).json({
      success: true,
      setId: set._id,
      setName: set.name,
      examType: exam.examType,
      examTime: exam.examTime,
      fullMarks: exam.fullMarks,
      subjects
    });

  } catch (error) {
    console.error("GET QUESTIONS ERROR:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};










module.exports = { uploadExamSet ,getSetsByExamType,getUniqueExamTypes,getSetNamesByExamType ,getQuestionsBySet};
