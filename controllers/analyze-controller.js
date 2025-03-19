import db from "../knex.js";
import Tesseract from "tesseract.js";
import sharp from "sharp";
import fs from "fs/promises";
import { correctOcrErrors } from "../utils/correctOcrText.js";

export const analyzeImage = async (req, res) => {
  const { skinType } = req.body; // 👈 Get skin type from request

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  if (!skinType) {
    return res.status(400).json({ error: "Skin type is required" });
  }

  try {
    const processedImagePath = `uploads/processed_${req.file.filename}.png`;

    await sharp(req.file.path)
      .resize({ width: 1200 })
      .greyscale()
      .normalise()
      .sharpen()
      .median(3)
      .toFormat("png")
      .toFile(processedImagePath);

    console.log("✅ Image preprocessing complete, running Tesseract OCR...");

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

    const correctedText = await correctOcrErrors(cleanedText);

    // ✅ Fetch all ingredients and their categories from the database
    const dbIngredients = await db
      .select("name", "category", "suitable_for", "description")
      .from("ingredients");

    const ingredientDictionary = dbIngredients.reduce((acc, item) => {
      acc[item.name.toLowerCase()] = item;
      return acc;
    }, {});

    // ✅ Extract & clean ingredients from OCR text
    const ingredients = correctedText
      .split(/\s*,\s*/)
      .map((ingredient) => ingredient.replace(/[^\w\s/-]/g, "").trim())
      .filter((ingredient) => ingredient.length > 2);

    const formattedIngredients = [...new Set(ingredients)].map((ingredient) =>
      ingredient.charAt(0).toUpperCase() + ingredient.slice(1).toLowerCase()
    );

    console.log("🔍 Matched Ingredients:", formattedIngredients);

    // ✅ Categorize ingredients based on suitability for the user's skin type
    const beneficial = [];
    const potentialIrritants = [];
    const harmful = [];

    formattedIngredients.forEach((ingredient) => {
      const match = ingredientDictionary[ingredient.toLowerCase()];
      if (match) {
        // ✅ Check if the ingredient is suitable for the user's skin type
        const suitableFor = match.suitable_for
          .split(",")
          .map((s) => s.trim().toLowerCase());

        if (suitableFor.includes(skinType) || suitableFor.includes("all")) {
          beneficial.push({
            name: match.name,
            category: match.category,
            description: match.description, // ✅ Added description
          });
        } else if (match.category === "Potential Irritant") {
          potentialIrritants.push({
            name: match.name,
            category: match.category,
            description: match.description,
          });
        } else {
          harmful.push({
            name: match.name,
            category: match.category,
            description: match.description,
          });
        }
      }
    });

    // ✅ Limit results to max 6 per category
    const response = {
      beneficial: beneficial.slice(0, 6),
      potentialIrritants: potentialIrritants.slice(0, 6),
      harmful: harmful.length > 0 ? harmful.slice(0, 6) : "No harmful ingredients detected ✅",
    };

    // ✅ Return the categorized results
    res.json(response);
  } catch (e) {
    console.error("❌ Error processing image:", e);
    return res.status(500).json({ error: "Server error" });
  }
};
