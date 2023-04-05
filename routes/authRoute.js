import express from "express";
import {
  registerController,
  loginController,
} from "../controllers/authController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

// routing
// Register (Post)
router.post("/register", registerController);
// Login (Post)
router.post("/login", loginController);

// protected route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
