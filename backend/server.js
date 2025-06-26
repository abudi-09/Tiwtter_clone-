import express from "express";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file
import authRoutes from "./routes/auth.routes.js"; // Adjust the path as necessary
import connectMongoDB from "./db/connectMongoDB.js";
import cookieParser from "cookie-parser";

// Load environment variables from .env file
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;
app.use(cookieParser()); // Middleware to parse cookies
app.use("/api/auth", authRoutes);
// Middleware to parse JSON bodies
app.listen(5000, () => {
  console.log("Server is running on port 5000");
  connectMongoDB();
});
