const examtypeModel = require("../models/examtypes.model");
const subjectModel = require("../models/subject.model");
async function addexamtype(req, res) {
  const { name, subjects } = req.body;
  try {
    const examtypefound = await examtypeModel.findOne({ name: name });
    if (examtypefound) {
      return res.status(409).json({ message: "Sorry examtype already exists" });
    }
    await examtypeModel.create({ name: name, subjects: subjects });
    return res
      .status(200)
      .json({ message: "New examtype creaated sucessfully" });
  } catch (err) {
    console.log("Error at add examtype function ", err);
  }
}

async function addSubject(req, res) {
  const { name, chapters } = req.body;
  try {
    const subjectfound = await subjectModel.findOne({ name: name });
    if (subjectfound) {
      return res.status(409).json({ message: "Sorry subject already exists" });
    }
    await subjectModel.create({ name: name, chapters: chapters });
    return res.status(200).json({ message: "New subject created sucessfully" });
  } catch (err) {
    console.log("Error from addsubject function", err);
  }
}
module.exports = { addexamtype, addSubject };
