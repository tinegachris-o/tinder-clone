import express from "express";
const router = express.Router();
import {protectRoute} from "../middleware/auth.js"
import {updateProfile} from "../controllers/userController.js"
router.put('/update',protectRoute,updateProfile)




export default router;
