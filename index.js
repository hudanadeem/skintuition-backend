import "dotenv/config";
import express from "express";
import cors from "cors";
import analyzeRouter from "./routes/analyze-routes.js";
import skinTypeRouter from "./routes/skin-type-routes.js";
import authRouter from "./routes/auth-routes.js"; 
import userRoutes from "./routes/user-routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Skintuition API is Running");
});

app.use("/api/analyze", analyzeRouter);
app.use("/api/skin-type", skinTypeRouter);
app.use("/api/auth", authRouter); 
app.use("/api/users", userRoutes);


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
