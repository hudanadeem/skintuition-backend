import express from "express";
import multer from "multer";
import * as analyzeController from "../controllers/analyze-controller.js";
import { clear } from "console";

const analyzeRouter = express.Router();
const upload = multer({ dest: "uploads/" }); // Temporary upload location

// Route for image analysis
analyzeRouter.post("/", upload.single("image"), analyzeController.analyzeImage);

export default analyzeRouter;