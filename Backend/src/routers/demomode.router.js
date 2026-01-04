const express = require('express');
const router = express.Router();
const{addexamtype,addSubject,getExamType,getSubjects,addQuestions,addChapters,getChapters,getQuestions} = require('../controllers/demomode.controller');


router.post('/addexamtype', addexamtype);
router.post('/addsubject',addSubject)
router.post('/addchapter',addChapters)
router.get('/getexams',getExamType)
router.get('/:examtype/subjects',getSubjects)
router.get('/:examtype/:subjects/chapters',getChapters)
router.get('/:examtype/:subject/:chapter/questions',getQuestions)
router.post("/addquestions",addQuestions)

module.exports = router;
