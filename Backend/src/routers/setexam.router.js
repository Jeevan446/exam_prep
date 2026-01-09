
const express = require("express");
const multer = require("multer");
const auth =require("../middleware/auth.middleware");
const { uploadExamSet } = require("../controllers/setexam.controller");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload",auth, upload.single("file"), uploadExamSet);

module.exports = router;
