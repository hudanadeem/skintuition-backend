import fs from "fs/promises";
import path from "path";
import db from "../knex.js";

export const getSkinTypeQuestions = async (req, res) => {
    try {
        const filePath = path.resolve("data/questions.json");
        const questions = await fs.readFile(filePath, "utf-8");
        res.json(JSON.parse(questions));
    } catch (error) {
        console.error("Error reading questions:", error);
        res.status(500).json({ error: "Failed to load questions" });
    }
};

export const determineSkinType = async (req, res) => {
    const { answers } = req.body;
    const userId = req.user?.userId;

    if (!answers || answers.length !== 5) {
        return res.status(400).json({ error: "Invalid input, provide 5 answers." });
    }

    let score = { dry: 0, oily: 0, sensitive: 0, combination: 0, normal: 0 };

    answers.forEach((answer, index) => {
        switch (index) {
            case 0: // Q1: How skin feels after cleansing
                if (answer === 1) score.dry += 3;
                if (answer === 2) score.dry += 2;
                if (answer === 3) score.oily += 1;
                if (answer === 4) score.normal += 2;
                if (answer === 5) score.oily += 3;
                if (answer === 6) score.combination += 1;
                break;
            case 1: // Q2: Breakouts frequency
                if (answer === 1) score.normal += 3;
                if (answer === 2) score.normal += 2;
                if (answer === 3) score.combination += 2;
                if (answer === 4) score.oily += 2;
                if (answer === 5) score.oily += 3;
                if (answer === 6) score.sensitive += 2;
                break;
            case 2: // Q3: Reaction to new skincare products
                if (answer === 1) score.sensitive += 3;
                if (answer === 2) score.sensitive += 2;
                if (answer === 3) score.sensitive += 1;
                if (answer === 4) score.normal += 2;
                if (answer === 5) score.normal += 3;
                if (answer === 6) score.combination += 1;
                break;
            case 3: // Q4: How skin feels by mid-day
                if (answer === 1) score.dry += 3;
                if (answer === 2) score.dry += 2;
                if (answer === 3) score.normal += 2;
                if (answer === 4) score.combination += 2;
                if (answer === 5) score.oily += 3;
                if (answer === 6) score.combination += 1;
                break;
            case 4: // Q5: Reaction to weather changes
                if (answer === 1) score.dry += 3;
                if (answer === 2) score.dry += 2;
                if (answer === 3) score.combination += 1;
                if (answer === 4) score.normal += 3;
                if (answer === 5) score.oily += 2;
                if (answer === 6) score.oily += 3;
                break;
        }
    });

    const skinType = Object.keys(score).reduce((a, b) => (score[a] > score[b] ? a : b));

    if (userId) {
        await db("users").where({ id: userId }).update({ skin_type: skinType });
        console.log(`🔄 Updated skin type for user ${userId} to ${skinType}`);
    }

    res.json({ skinType });
};
