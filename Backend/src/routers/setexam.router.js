
const express = require("express");
const multer = require("multer");
const auth =require("../middleware/auth.middleware");
const { uploadExamSet ,getQuestionsBySet ,getSetsByExamType ,getUniqueExamTypes } = require("../controllers/setexam.controller");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload",auth, upload.single("file"), uploadExamSet);

router.get("/set-questions/:setId", getQuestionsBySet);

router.get("/examtypes", getUniqueExamTypes);

router.get("/sets/:examType", getSetsByExamType);





module.exports = router;
