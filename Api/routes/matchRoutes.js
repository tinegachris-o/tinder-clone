import express from "express";
const router = express.Router();
import { protectRoute } from "../middleware/auth.js";
import {
  swipeLeft,
  swipeRight,
  getMatches,
  getUserProfiles,
} from "../controllers/matchesController.js";
router.post("/swipe-right/:likedUserId", protectRoute, swipeRight);
router.post("/swipe-left/:dislikedUserId", protectRoute, swipeLeft);
router.get("/", protectRoute, getMatches);
router.get("/user-profiles", protectRoute, getUserProfiles);
export default router;
