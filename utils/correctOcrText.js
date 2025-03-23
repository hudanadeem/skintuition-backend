import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export async function correctOcrErrors(ocrText) {
  try {
    const prompt = `I extracted this text using OCR: "${ocrText}". The text contains errors due to poor recognition. Please:
    - Correct any spelling mistakes.
    - Separate each ingredient correctly (if multiple words are joined together).
    - Remove unnecessary text (branding, website links, batch codes).
    - Return only a comma-separated list of skincare ingredients (no extra text, no explanations).`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    let correctedText = result.response?.candidates?.[0]?.content?.parts?.[0]?.text || ocrText;
    correctedText = correctedText.replace(/^.*\n\n/, ""); 

    return correctedText;
  } catch (error) {
    console.error("Error in Gemini OCR correction:", error);
    return ocrText; 
  }
}