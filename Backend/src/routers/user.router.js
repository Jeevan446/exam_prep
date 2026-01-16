import express from "express";
const router = express.Router();
import {
  registerUser,
  loginUser,
  getUserProfile,
  changePassword,
  updateUserProfile
} from "../controllers/userController.js"

import  auth  from "../middleware/auth.middleware.js"
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/changepassword",auth,changePassword);
router.get('/profile',auth,getUserProfile);
router.put('/updateprofile',auth,updateUserProfile);

export default router
