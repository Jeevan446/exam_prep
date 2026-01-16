import  express from "express"
const router = express.Router();

import {createNotice,getNotice} from '../controllers/notice.controller.js'
import  auth from "../middleware/auth.middleware.js"
import isAdmin from "../middleware/isAdmin.middleware.js"

//if user is login and admin then user can create notice
router.post("/notice", auth, isAdmin, createNotice);

//for getting notice..
router.get("/getnotice", getNotice);

export default router
