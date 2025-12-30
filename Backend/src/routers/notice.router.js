const express = require("express");
const router = express.Router();

const { createNotice, getNotice } = require("../controllers/notice.controller");
const auth = require("../middleware/auth.middleware");
const isAdmin = require("../middleware/isAdmin.middleware");

//if user is login and admin then user can create notice
router.post("/notice", auth, isAdmin, createNotice);

//for getting notice..
router.get("/getnotice", getNotice);

module.exports = router;
