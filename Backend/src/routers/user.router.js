import express from "express";
const router = express.Router();
import {
  registerUser,
  loginUser,
  getUserProfiles,
  changePassword,
  updateUserProfile
} from "../controllers/userController.js"

import  auth  from "../middleware/auth.middleware.js"
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/changepassword",auth,changePassword);
router.get('/profile',auth,getUserProfiles);
router.put('/updateprofile',auth,updateUserProfile);

export default router
