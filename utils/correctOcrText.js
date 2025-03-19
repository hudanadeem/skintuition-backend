import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Google Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function correctOcrErrors(ocrText) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5" });

    const prompt = `I extracted this text using OCR: "${ocrText}" The text contains errors due to poor recognition. Please:
    - Correct any spelling mistakes.
    - Separate each ingredient correctly (if multiple words are joined together).
    - Remove unnecessary text (branding, website links, batch codes).
    - Return only a list of skincare ingredients, separated by commas.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const correctedText = response.text();

    return correctedText;
  } catch (error) {
    console.error("Error in Gemini OCR correction:", error);
    return ocrText; // If error, return original text
  }
}
