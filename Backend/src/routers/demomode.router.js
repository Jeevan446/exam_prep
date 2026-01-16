import express, { Router } from 'express'
const router = express.Router();
import {addChapters,addQuestions,addSubject,addexamtype,getChapters,getExamType,getQuestions,getSubjects} from '../controllers/demomode.controller.js'


router.post('/addexamtype', addexamtype);
router.post('/addsubject',addSubject)
router.post('/addchapter',addChapters)
router.get('/getexams',getExamType)
router.get('/:examtype/subjects',getSubjects)
router.get('/:examtype/:subjects/chapters',getChapters)
router.get('/:examtype/:subject/:chapter/questions',getQuestions)
router.post("/addquestions",addQuestions)

export default router
