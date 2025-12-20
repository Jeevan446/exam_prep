const express = require('express');
const router = express.Router();
const{addexamType} = require('../controllers/demomode.controller');


router.post('/addexamtype', addexamType);

module.exports = router;


