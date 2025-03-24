import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export async function analyzeIngredients(ocrText, skinType) {
  try {
    const prompt = `
    Analyze this skincare ingredients list for a user with **${skinType} skin**:

    ### Rules:
    1. **Group identical ingredients** (e.g., "aqua", "water", "eau" → "water").
    2. Categorize each unique ingredient as:
       - "Beneficial" (if good for ${skinType} skin)
       - "Harmful" (if toxic/unsafe for any skin type)
       - "Potential Irritant" (if may irritate ${skinType} skin)
    3. **Return strict JSON** (no extra text) with this structure:
    {
      "skinType": "${skinType}",
      "ingredientsList": "cleaned, comma-separated list",
      "analysis": {
        "summary": "For your ${skinType} skin: X beneficial, Y irritants, Z harmful ingredients found.",
        "beneficial": [{"name": "...", "reason": "..."}],
        "potentialIrritants": [{"name": "...", "reason": "..."}],
        "harmful": [{"name": "...", "reason": "..."}]
      }
    }

    ### Ingredients (OCR Output):
    ${ocrText}
    `;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const responseText = result.response?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/) || [responseText];
    return JSON.parse(jsonMatch[1].trim());
  } catch (error) {
    console.error("Gemini error:", error);
    return {
      skinType,
      ingredientsList: ocrText,
      analysis: {
        summary: "Analysis failed. Showing raw ingredients.",
        beneficial: [],
        potentialIrritants: [],
        harmful: [],
      },
    };
  }
}