import express from "express";
const router = express.Router();
import { protectRoute } from "../middleware/auth.js";
import {
  getConversation,
  sendMessage,
} from "../controllers/messageControllers.js";
router.use(protectRoute);
router.post("/send", sendMessage);
router.get("/conversation/:senderId", getConversation);

export default router;
