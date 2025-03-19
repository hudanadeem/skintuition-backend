import "dotenv/config";
import express from "express";
import cors from "cors";
import analyzeRouter from "./routes/analyze-routes.js";
// import userRoutes from "./routes/users-routes.js";
// import ingredientRoutes from "./routes/ingredients-routes.js";
// import productRoutes from "./routes/products-routes.js";


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Skintuition API is Running");
});

app.use("/api/analyze", analyzeRouter);
// app.use("/api/users", userRoutes);
// app.use("/api/ingredients", ingredientRoutes);
// app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
