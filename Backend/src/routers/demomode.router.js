const express = require('express');
const router = express.Router();
const{addexamtype,addSubject,getExamType,getSubjects} = require('../controllers/demomode.controller');


router.post('/addexamtype', addexamtype);
router.post('/addsubject',addSubject)
router.get('/getexams',getExamType)
router.get('/getsubjects',getSubjects)
module.exports = router;


