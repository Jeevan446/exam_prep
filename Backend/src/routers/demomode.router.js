const express = require('express');
const router = express.Router();
const{addexamtype,addSubject,getExamType,getSubjects,addQuestions,addChapter,getChapters} = require('../controllers/demomode.controller');


router.post('/addexamtype', addexamtype);
router.post('/addsubject',addSubject)
router.post('/addchapter',addChapter)
router.get('/getexams',getExamType)
router.get('/:examtype/subjects',getSubjects)
router.get('/:examtype/:subjects/chapters',getChapters)
router.post("/addquestions",addQuestions)
module.exports = router;


