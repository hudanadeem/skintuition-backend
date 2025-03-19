import db from "../knex.js";
import Tesseract from "tesseract.js";
import sharp from "sharp";
import fs from "fs/promises";
import { correctOcrErrors } from "../utils/correctOcrText.js";

export const analyzeImage = async (req, res) => {

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
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

    console.log("1) Image preprocessing complete, running Tesseract OCR...");

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
      .replace(
        /\b(?:ingredients|aqua|water|laboratoire|pharmaceutique|france|roche|posay|com|tsa|asnieres|cedex|www|f|ly|tita|seb|amm|met|poly|dimet|sis|ste|aci)\b/g,
        ""
      )
      .replace(/\s+/g, " ") // Normalize spaces
      .trim();

    const correctedText = await correctOcrErrors(cleanedText);

    const dbIngredients = await db.select("name", "category").from("ingredients");
    const ingredientDictionary = new Set(
      dbIngredients.map((i) => i.name.toLowerCase())
    );

    const ingredients = correctedText
      .split(/\s*,\s*/) 
      .map((ingredient) => ingredient.replace(/[^\w\s/-]/g, "").trim()) 
      .filter((ingredient) => ingredient.length > 2); 

    console.log("Extracted Ingredients:", ingredients);

    function formatIngredientName(name) {
      return name
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
    }

    const cleanUpIngredient = (name) => {
      return name.replace(/\b(code|fl|d\d{1,3})\b/gi, "").trim();
    };

    const uniqueIngredients = Array.from(
      new Set(ingredients.map(cleanUpIngredient))
    ).map(formatIngredientName);

    console.log("Final Cleaned Ingredients:", uniqueIngredients);

    const matchedIngredients = uniqueIngredients.filter((ingredient) =>
      ingredientDictionary.has(ingredient.toLowerCase())
    );

    console.log("MATCHED Ingredients Detected:", matchedIngredients);

    let ingredientDetails = await Promise.all(
      matchedIngredients.map(async (ingredient) => {
        try {
          const result = await db
            .select("name", "category")
            .from("ingredients")
            .whereRaw("LOWER(name) = ?", [ingredient.toLowerCase()]);

          return result.length
            ? result[0]
            : { name: ingredient, category: "Unknown" };
        } catch (dbError) {
          console.error(
            "Database query failed for ingredient:",
            ingredient,
            dbError
          );
          return { name: ingredient, category: "Error fetching category" };
        }
      })
    );

    ingredientDetails = ingredientDetails.slice(0, 6);
    if (ingredientDetails.length < 3) {
      return res.status(400).json({ error: "Not enough matched ingredients detected." });
    }

    res.json({ ingredients: ingredientDetails });
  } catch (e) {
    console.error("Error processing image:", e);
    return res.status(500).json({ error: "Server error" });
  }
};
