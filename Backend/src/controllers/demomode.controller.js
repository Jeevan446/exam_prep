const examtypeModel = require("../models/examtypes.model");
const subjectModel = require("../models/subject.model");
const questionModel=require('../models/question.model')
const chapterModel=require('../models/chapter.model')

// add exam type
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

// add subject

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


// get ExamType

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

//get subjects

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

//add questions

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

//get questions

async function getQuestions(req,res){
try{
  
  const questions=await questionModel.find({examtype:req.params.examtype,subject:req.params.subject,chapter:req.params.chapter})
 if(questions){
  return res.status(200).json({message:questions})
 }
 else{
  return res.status(404).json({message:"Sorry question not found"})
 }
}catch(err){
console.log("Error at getquestions function")
}
}

// add chapters
async function addChapters(req, res) {
  try {
    const { examtype, subject, chapters } = req.body;

    if (!examtype || !subject || !Array.isArray(chapters) || chapters.length === 0) {
      return res.status(400).json({ message: "Please provide examtype, subject, and at least one chapter" });
    }

    // Filter out chapters that already exist
    const existingChapters = await chapterModel.find({
      examtype,
      subject,
      name: { $in: chapters }
    }).select("name");

    const existingNames = existingChapters.map(ch => ch.name);

    const newChapters = chapters
      .filter(ch => !existingNames.includes(ch))
      .map(ch => ({ examtype, subject, name: ch }));

    if (newChapters.length === 0) {
      return res.status(409).json({ message: "All chapters already exist" });
    }

    // Use chapterModel here
    await chapterModel.insertMany(newChapters);

    res.status(200).json({ 
      message: "Chapters added successfully", 
      added: newChapters.map(c => c.name) 
    });
  } catch (err) {
    console.error("Error from addChapters function:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}


// get chapters

async function getChapters(req,res){
  console.log(req.params)
try{
  const chapters=await chapterModel.find({examtype:req.params.examtype,subject:req.params.subjects});
if (chapters){
  return res.status(200).json({message:chapters})
}
else{
  return res.status(404).json({message:"Sorry chapter not found"})
}
}catch(err){
  console.log("Error from showchapter function")
}
}
module.exports = { getQuestions,getExamType, addexamtype, addSubject, getSubjects,addQuestions,addChapters,getChapters};
