
const express = require("express");
const multer = require("multer");
const auth =require("../middleware/auth.middleware");
const { uploadExamSet ,getSetsByExamType ,getUniqueExamTypes ,getSetNamesByExamType ,getQuestionsBySet} = require("../controllers/setexam.controller");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload",auth, upload.single("file"), uploadExamSet);

//get all examset according to examptye
router.get("/examset/:examType", getSetsByExamType);

router.get("/exam-types", getUniqueExamTypes);
// http://localhost:3000/api/setexam/exam-types 

router.get("/setnames/:examType", getSetNamesByExamType);
// GET http://localhost:3000/api/setexam/setnames/ioe

router.get("/set-questions/:setId", getQuestionsBySet);




module.exports = router;
