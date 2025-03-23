import db from "../knex.js";
import Tesseract from "tesseract.js";
import sharp from "sharp";
import fs from "fs/promises";
import { correctOcrErrors } from "../utils/correctOcrText.js";

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

    const skinType = user.skinType;
    console.log("Skin Type:", skinType);
    const processedImagePath = `uploads/processed_${req.file.filename}.png`;

    await sharp(req.file.path)
      .resize({ width: 1200 })
      .greyscale()
      .normalise()
      .sharpen()
      .median(3)
      .toFormat("png")
      .toFile(processedImagePath);

    console.log("Image preprocessing complete, running Tesseract OCR...");

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

    const dbIngredients = await db
      .select("name", "category", "suitable_for", "description")
      .from("ingredients");

    const ingredientDictionary = dbIngredients.reduce((acc, item) => {
      acc[item.name.toLowerCase()] = item;
      return acc;
    }, {});

    const ingredients = correctedText
      .split(/\s*,\s*/)
      .map((ingredient) => ingredient.replace(/[^\w\s/-]/g, "").trim())
      .filter((ingredient) => ingredient.length > 2);

    const formattedIngredients = [...new Set(ingredients)].map((ingredient) =>
      ingredient.charAt(0).toUpperCase() + ingredient.slice(1).toLowerCase()
    );

    console.log("Matched Ingredients:", formattedIngredients);

    const beneficial = [];
    const potentialIrritants = [];
    const harmful = [];

    formattedIngredients.forEach((ingredient) => {
      const match = ingredientDictionary[ingredient.toLowerCase()];
      if (match) {
        const suitableFor = match.suitable_for
          .split(",")
          .map((s) => s.trim().toLowerCase());

        if (suitableFor.includes(skinType) || suitableFor.includes("all")) {
          beneficial.push({
            name: match.name,
            category: match.category,
            description: match.description,
          });
        }
        else if (match.category === "Potential Irritant") {
          potentialIrritants.push({
            name: match.name,
            category: match.category,
            description: match.description,
          });
        }
        else if (match.category === "Harmful") {
          harmful.push({
            name: match.name,
            category: match.category,
            description: match.description,
          });
        }
      }
    });

    const response = {
      beneficial: beneficial.slice(0, 6),
      potentialIrritants: potentialIrritants.slice(0, 6),
      harmful: harmful.slice(0, 6), 
    };

    res.json(response);
  } catch (e) {
    console.error("Error processing image:", e);
    return res.status(500).json({ error: "Server error" });
  }
};