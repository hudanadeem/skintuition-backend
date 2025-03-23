import express from "express";
import { getSkinTypeQuestions, determineSkinType } from "../controllers/skin-type-controller.js";
import { authenticateUser } from "../middleware/auth-Middleware.js";

const skinTypeRouter = express.Router();

skinTypeRouter.get("/questions", getSkinTypeQuestions);
skinTypeRouter.post("/", authenticateUser, determineSkinType);

export default skinTypeRouter;
