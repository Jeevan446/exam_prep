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

    // 4️⃣ Loop over Excel rows
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

      // 5️⃣ Create set in map if not exists
      if (!setsMap[setName]) {
        setsMap[setName] = { name: setName, exams: [] };
      }

      // 6️⃣ Create or find question
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

      // 7️⃣ Add exam to set
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

    // 8️⃣ Convert map to array and attach createdBy
    const finalSets = Object.values(setsMap).map((s) => ({
      ...s,
      createdBy,
    }));

    // 9️⃣ Save all sets to DB
    const savedSets = await Set.insertMany(finalSets);

    res.json({ success: true, savedSets });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

//get set acording  set id

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



//get unique examtype


const getUniqueExamTypes = async (req, res) => {
  try {
    const result = await Set.aggregate([
      { $unwind: "$exams" },
      { $group: { _id: null, examTypes: { $addToSet: "$exams.examType" } } },
      { $project: { _id: 0, examTypes: 1 } }
    ]);

    res.status(200).json({
      success: true,
      total: result[0]?.examTypes?.length || 0,
      examTypes: result[0]?.examTypes || []
    });

  } catch (error) {
    console.error("GET UNIQUE EXAM TYPES ERROR:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};




//it gives setname  acrroding examtype

const getSetsByExamType = async (req, res) => {
  try {
    const examType = req.params.examType?.trim().toLowerCase();

    if (!examType) return res.status(400).json({ success: false, message: "examType required" });

    const sets = await Set.find({ "exams.examType": examType });

    if (!sets.length)
      return res.status(200).json({ success: true, examType, totalSets: 0, sets: [] });

    // Return only set names and _id
    const setList = sets.map(set => ({
      setId: set._id,
      setName: set.name
    }));

    res.status(200).json({
      success: true,
      examType,
      totalSets: setList.length,
      sets: setList
    });

  } catch (error) {
    console.error("GET SETS ERROR:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};



module.exports = { uploadExamSet,getQuestionsBySet ,getUniqueExamTypes,getSetsByExamType};
