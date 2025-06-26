import express from "express";
import dotenv from "dotenv";
dotenv.config();
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectMongoDB from "./db/connectMongoDB.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.listen(5000, () => {
  console.log("Server is running on port 5000");
  connectMongoDB();
});
