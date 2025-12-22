const examtypeModel = require("../models/examtypes.model");
const subjectModel = require("../models/subject.model");

async function addexamtype(req, res) {
  const { name, subjects ,discription} = req.body;
  try {
    const examtypefound = await examtypeModel.findOne({ name: name });
    if (examtypefound) {
      return res.status(409).json({ message: "Sorry examtype already exists" });
    }
    await examtypeModel.create({ name: name, subjects: subjects ,discription:discription});
    return res
      .status(200)
      .json({ message: "New examtype creaated sucessfully" });
  } catch (err) {
    console.log("Error at add examtype function ", err);
  }
}

async function addSubject(req, res) {
  const {examtype, name, chapters } = req.body;

  try {
    const subjectfound = await subjectModel.findOne({ name: name });
    if (subjectfound) {
      return res.status(409).json({ message: "Sorry subject already exists" });
    }
    await subjectModel.create({ examtype:examtype,name: name, chapters: chapters });
    return res.status(200).json({ message: "New subject created sucessfully" });
  } catch (err) {
    console.log("Error from addsubject function", err);
  }
}

async function getExamType(req, res) {
  try {
    const examtypefound = await examtypeModel.find();

    if (!examtypefound) {
      return res.status(404).json({ message: "not found" });
    }
    return res.status(200).json({ examTypes: examtypefound ,discription:discription});
  } catch (err) {
    console.log("There is error on exam type");
  }
}
async function getSubjects(req, res) {
  try {
    const subjectFound = await subjectModel.find();
    if (!subjectFound) {
      return res.status(404).json({ message: "subject not found" });
    }

    return res.status(200).json({ subjects: subjectFound });
  } catch (err) {
    console.log("Error from getsubjects function",err);
  }
}

module.exports = { getExamType, addexamtype, addSubject, getSubjects };
