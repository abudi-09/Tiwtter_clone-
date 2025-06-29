import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";
export const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming req.user is populated by the protectRoute middleware
    const notifications = await Notification.find({ to: userId })
      .populate({
        path: "from",
        select: "username profileImg",
      })
      .sort({ createdAt: -1 });
    await Notification.updateMany({ to: userId }, { Read: true });
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteNotification = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming req.user is populated by the protectRoute middleware

    await Notification.deleteMany({ to: userId });
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    console.error("Error deleting notification:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
