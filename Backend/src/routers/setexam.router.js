import express from "express";
import multer from "multer";

import { uploadExamSet, getQuestionsBySet, getSetsByExamTypeAndSetType, getUniqueExamTypes } 
  from '../controllers/setexam.controller.js';

const router = express.Router();
const upload = multer({ dest: "uploads/" });

import isAdmin from "../middleware/auth.middleware.js"
import auth from "../middleware/auth.middleware.js";
import { checkPaidUser } from "../middleware/checkpaiduser.middleware.js";

// Routes
router.post("/upload", auth, upload.single("file"),auth,isAdmin, uploadExamSet);
router.get("/set-questions/:setId",auth, getQuestionsBySet);
router.get("/getexamtype",auth, getUniqueExamTypes);
router.get("/:examType/:setType",auth,checkPaidUser, getSetsByExamTypeAndSetType);

export default router;
