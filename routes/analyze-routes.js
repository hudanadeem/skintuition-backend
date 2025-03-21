import express from "express";
import multer from "multer";
import * as analyzeController from "../controllers/analyze-controller.js";
import { authenticateUser } from "../middleware/auth-Middleware.js";

const analyzeRouter = express.Router();
const upload = multer({ dest: "uploads/" }); // Temporary upload location

// Route for image analysis
analyzeRouter.post("/", authenticateUser ,upload.single("image"), analyzeController.analyzeImage);

export default analyzeRouter; 