const express = require('express');
const router = express.Router();
const{addexamtype} = require('../controllers/demomode.controller');


router.post('/addexamtype', addexamtype);

module.exports = router;


