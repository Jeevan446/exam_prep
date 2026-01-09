const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  changePassword,
  updateUserProfile
} = require("../controllers/userController");

const auth = require("../middleware/auth.middleware");
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/changepassword",auth,changePassword);
router.get('/profile',auth,getUserProfile);
router.put('/updateprofile',auth,updateUserProfile);

module.exports = router;
