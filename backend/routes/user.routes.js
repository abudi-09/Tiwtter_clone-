import express from "express";
import {
  getUserProfile,
  followUnfollowUser,
  // updateUserProflie (uncomment this line if you plan to use it)
} from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/protectRoutes.js";

const router = express.Router();

router.get("/profile/:username", protectRoute, getUserProfile);
// router.get("/suggested", protectRoute, getUserProfile); // Uncomment when ready
router.post("/followers/:id", protectRoute, followUnfollowUser);
// router.get("/update", protectRoute, updateUserProflie); // Uncomment and ensure it's imported

export default router;
