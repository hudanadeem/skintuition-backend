import db from "../knex.js";

export const updateSkinType = async (req, res) => {
    const { skinType } = req.body;
    const userId = req.user.userId; 

    if (!skinType) {
        return res.status(400).json({ error: "Skin type is required." });
    }

    try {
        await db("users")
            .where({ id: userId })
            .update({ skin_type: skinType });

        res.json({ message: "Skin type updated successfully." });
    } catch (error) {
        console.error("Error updating skin type:", error);
        res.status(500).json({ error: "Failed to update skin type." });
    }
};

export const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.userId; 

        const user = await db("users")
            .select("id", "name", "email", "skin_type", "created_at")
            .where({ id: userId })
            .first();

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ error: "Server error" });
    }
};