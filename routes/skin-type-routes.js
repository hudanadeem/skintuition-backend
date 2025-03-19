import express from "express";
import { getSkinTypeQuestions, determineSkinType } from "../controllers/skin-type-controller.js"; 

const skinTypeRouter = express.Router();

skinTypeRouter.get("/questions", getSkinTypeQuestions); 
skinTypeRouter.post("/", determineSkinType); 

export default skinTypeRouter;
