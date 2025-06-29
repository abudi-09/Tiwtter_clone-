import express from "express";
import {
  getNotifications,
  deleteNotification,
} from "../controllers/Notification.controller.js";
import { protectRoute } from "../middleware/protectRoutes.js";
const router = express.Router();
router.get("/", protectRoute, getNotifications); // Get all notifications for the authenticated user
router.delete("/", protectRoute, deleteNotification); // Delete a specific notification by ID
export default router;
