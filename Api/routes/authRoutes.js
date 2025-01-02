import express from "express";
import { signup, login, logout } from "../controllers/authController.js";
const router = express.Router();
import { protectRoute } from "../middleware/auth.js";

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", protectRoute, (req, res) => {
  res.send({
    success: true,
    user: req.user,
  });
});
export default router;
