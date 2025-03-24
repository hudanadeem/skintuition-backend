import db from "../knex.js";
import Tesseract from "tesseract.js";
import sharp from "sharp";
import { analyzeIngredients } from "../utils/analyzeIngredients.js";

export const analyzeImage = async (req, res) => {
  const userId = req.user.userId;

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const user = await db("users").where({ id: userId }).first();
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const skinType = user.skin_type || "unknown";
    const processedImagePath = `uploads/processed_${req.file.filename}.png`;

    await sharp(req.file.path)
      .resize({ width: 1200 })
      .greyscale()
      .normalise()
      .sharpen()
      .median(3)
      .toFormat("png")
      .toFile(processedImagePath);

    const {
      data: { text: detectedText },
    } = await Tesseract.recognize(processedImagePath, "eng");

    if (!detectedText.trim()) {
      return res.status(400).json({ error: "No text detected" });
    }

    const cleanedText = detectedText
      .toLowerCase()
      .replace(/\d{5,}/g, "")
      .replace(/www\.\S+|https?:\/\/\S+/g, "")
      .replace(/[^\w\s,-]/g, "")
      .replace(/\s+/g, " ")
      .trim();

    const analysisResult = await analyzeIngredients(cleanedText, skinType);

    const response = {
      skinType: analysisResult.skinType || skinType,
      summary:
        analysisResult.analysis?.summary ||
        `For your ${skinType} skin: analysis completed`,
      ingredientsList: analysisResult.ingredientsList || cleanedText,
      analysis: {
        beneficial: analysisResult.analysis?.beneficial?.slice(0, 6) || [],
        potentialIrritants:
          analysisResult.analysis?.potentialIrritants?.slice(0, 6) || [],
        harmful: analysisResult.analysis?.harmful?.slice(0, 6) || [],
      },
    };

    return res.json(response);
  } catch (e) {
    console.error("Error processing image:", e);
    return res.status(500).json({ error: "Server error" });
  }
};
