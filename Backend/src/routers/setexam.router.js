import express from "express";
import multer from "multer";
import auth from "../middleware/auth.middleware.js";
import { uploadExamSet, getQuestionsBySet, getSetsByExamType, getUniqueExamTypes } 
  from '../controllers/setexam.controller.js';

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Routes
router.post("/upload", auth, upload.single("file"), uploadExamSet);
router.get("/set-questions/:setId", getQuestionsBySet);
router.get("/getexamtype", getUniqueExamTypes);
router.get("/sets/:examType", getSetsByExamType);

export default router;
