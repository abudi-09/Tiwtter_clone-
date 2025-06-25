import express from "express";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file
import authRoutes from "./routes/auth.routes.js"; // Adjust the path as necessary
import connectMongoDB from "./db/connectMongoDB.js";

// Load environment variables from .env file
const app = express();
const PORT = process.env.PORT || 5000;
app.use("/api/auth", authRoutes);
app.use(express.json()); // Middleware to parse JSON bodies
app.listen(5000, () => {
  console.log("Server is running on port 5000");
  connectMongoDB();
});
