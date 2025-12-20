const express = require('express');
const router = express.Router();
const{addexamType} = require('../controllers/demomode.controller');


router.post('/examtype', addexamType);

module.exports = router;


