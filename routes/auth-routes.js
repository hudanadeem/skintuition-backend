import express from "express";
import { registerUser, loginUser, getUserProfile } from "../controllers/auth-controller.js";
import { authenticateUser } from "../middleware/auth-Middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authenticateUser, getUserProfile);

export default router;
