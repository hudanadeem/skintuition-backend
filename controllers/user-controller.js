import db from "../knex.js";

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