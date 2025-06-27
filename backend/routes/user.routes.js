import express from "express";
import {
  getUserProfile,
  followUnfollowUser,
  getSuggestedUsers, // ensure this is imported correctly
  // updateUserProflie (uncomment this line if you plan to use it)
  updateUser, // ensure this is imported correctly
} from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/protectRoutes.js";
const router = express.Router();
router.get("/profile/:username", protectRoute, getUserProfile);
router.get("/Suggested", protectRoute, getSuggestedUsers); // Uncomment and ensure it's imported
router.post("/followers/:id", protectRoute, followUnfollowUser);
router.post("/update", protectRoute, updateUser); // Uncomment and ensure it's imported
export default router;
