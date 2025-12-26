const examtypeModel = require("../models/examtypes.model");
const subjectModel = require("../models/subject.model");
const questionModel=require('../models/question.model')
const chapterModel=require('../models/chapter.model')
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
    return res.status(200).json({ examTypes: examtypefound});
  } catch (err) {
    console.log("There is error on exam type");
  }
}
async function getSubjects(req, res) {
console.log(req.params)
  try {
    const subjectFound = await subjectModel.find({examtype:req.params.examtype});
    if (!subjectFound) {
      return res.status(404).json({ message: "subject not found" });
    }

    return res.status(200).json({ subjects: subjectFound });
  } catch (err) {
    console.log("Error from getsubjects function",err);
  }
}


async function addQuestions(req,res){
try{
const{name,examtype,subject,chapter,level,options,answer,marks,creator}=req.body;
const isquestionAvail=await questionModel.findOne({name:name,examtype:examtype})
if(isquestionAvail){
  return res.status(409).json({message:"Sorry the question already in the questionbank"})
}

await questionModel.create({name:name,examtype:examtype,subject:subject,chapter:chapter,level:level,options:options,answer:answer,marks:marks,creator:creator})
return res.status(200).json({message:"Question created sucessfully"})
}catch(err){
  console.log("Error occured in addQuestions page",err)
}
}

async function addChapter(req,res){
  try{
    const {examtype,subject,name}=req.body;

    const chapterfound=await chapterModel.findOne({examtype:examtype,subject:subject,name:name})
    if(chapterfound){
      return res.status(409).json({message:"Sorry chapter already exists"})
    }
    chapterModel.create({examtype:examtype,subject:subject,name:name})
    return res.status(200).json({message:"chapter created sucessfully"})
  }catch(err){
    console.log("Error from addchapter function")
  }
}

async function getChapters(req,res){
  console.log(req.params)
try{
  const chapters=await chapterModel.find({examtype:req.params.examtype,subject:req.params.subjects});
  return res.status(200).json({message:chapters})
}catch(err){
  console.log("Error from showchapter function")
}
}
module.exports = { getExamType, addexamtype, addSubject, getSubjects,addQuestions,addChapter,getChapters};
