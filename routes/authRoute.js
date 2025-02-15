import express from "express";
import {
  registerController,
  loginController,
  forgotPasswordController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

// routing
// Register (Post)
router.post("/register", registerController);
// Login (Post)
router.post("/login", loginController);
// Forgot Password (Post)
router.post("/forgot-password", forgotPasswordController);

// protected user route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).json({ ok: true });
});

// protected admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).json({ ok: true });
});

export default router;
