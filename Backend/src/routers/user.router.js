import express from "express";
const router = express.Router();
import {
  registerUser,
  loginUser,
  getUserProfile,
  changePassword,
  updateUserProfile ,updateRole,getallUsers
} from "../controllers/userController.js"
 
import  auth  from "../middleware/auth.middleware.js"
import isAllowedAccess from "../middleware/isModerator.middlewar.js";
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/changepassword",auth,changePassword);
router.get('/profile',auth,getUserProfile);
router.put('/updateprofile',auth,updateUserProfile);
router.put('/updaterole/:selectedid',auth,isAllowedAccess,updateRole);
router.get('/getallusers',getallUsers);

export default router
