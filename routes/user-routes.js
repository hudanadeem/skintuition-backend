import express from "express";
import { getUserProfile } from "../controllers/user-controller.js";
import { authenticateUser } from "../middleware/auth-Middleware.js";

const router = express.Router();

router.get("/profile", authenticateUser, getUserProfile); 


export default router;
