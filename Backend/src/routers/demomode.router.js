const express = require('express');
const router = express.Router();
const{addexamtype,addSubject,getExamType,getSubjects,addQuestions} = require('../controllers/demomode.controller');


router.post('/addexamtype', addexamtype);
router.post('/addsubject',addSubject)
router.get('/getexams',getExamType)
router.get('/getsubjects',getSubjects)
router.post("/addquestions",addQuestions)
module.exports = router;


