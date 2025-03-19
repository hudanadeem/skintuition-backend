import express from "express";
import { getUserProfile, updateSkinType } from "../controllers/user-controller.js";
import { authenticateUser } from "../middleware/auth-Middleware.js";

const router = express.Router();

router.get("/profile", authenticateUser, getUserProfile); 
router.post("/update-skin-type", authenticateUser, updateSkinType);

export default router;
