import express from "express";
import Notification from "../schema/notifySchema.mjs"; // Import Notification schema
import Admin from "../schema/admin.schema.mjs"; // Import Admin schema

const router = express.Router();

// Get all notifications for a specific admin
router.get("/admins/:adminId/notifications", async (req, res) => {
  const { adminId } = req.params;

  try {
    // Check if the admin exists
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Fetch notifications for this admin
    const notifications = await Notification.find({ adminId });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Add a new notification for a specific admin
router.post("/admins/:adminId/notifications", async (req, res) => {
  const { adminId } = req.params;
  const { type, message } = req.body;

  try {
    // Check if the admin exists
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Create a new notification
    const newNotification = new Notification({
      adminId: adminId, // Associate with the admin
      type,
      message,
    });

    // Save the notification to the database
    await newNotification.save();

    res.status(201).json(newNotification);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
