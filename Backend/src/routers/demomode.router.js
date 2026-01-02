const express = require('express');
const router = express.Router();
const{ getQuestions,addexamtype,addSubject,getExamType,getSubjects,addQuestions,addChapter,getChapters,getQuestions} = require('../controllers/demomode.controller');


router.post('/addexamtype', addexamtype);
router.post('/addsubject',addSubject)
router.post('/addchapter',addChapter)
router.get('/getexams',getExamType)
router.get('/:examtype/subjects',getSubjects)
router.get('/:examtype/:subjects/chapters',getChapters)
router.get('/:examtype/:subject/:chapter/questions',getQuestions)
router.post("/addquestions",addQuestions)
router.get("/getquestions",getQuestions)
module.exports = router;


