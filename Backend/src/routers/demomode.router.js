const express = require('express');
const router = express.Router();
const{addexamtype,addSubject} = require('../controllers/demomode.controller');


router.post('/addexamtype', addexamtype);
router.post('/addsubject',addSubject)

module.exports = router;


