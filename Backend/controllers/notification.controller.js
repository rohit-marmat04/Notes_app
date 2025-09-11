import NotificationModel from "../models/notification.model.js";

// POST /api/notifications - Admin adds notification
export const addNotification = async (req, res) => {
  try {
    const { title, type, description, link, buttonLabel } = req.body;

    if (!title || !type || !description || !link) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    const newNotification = new NotificationModel({
      title,
      type,
      description,
      link,
      buttonLabel: buttonLabel || 'Apply'
    });

    await newNotification.save();

    res.status(201).json({ message: "Notification created successfully", notification: newNotification });
  } catch (err) {
    res.status(500).json({ message: "Error creating notification", error: err.message });
  }
};

// GET /api/notifications - All users can view
export const getNotifications = async (req, res) => {
  try {
    const notifications = await NotificationModel.find().sort({ createdAt: -1 });
    res.status(200).json({ notifications });
  } catch (err) {
    res.status(500).json({ message: "Error fetching notifications", error: err.message });
  }
};

export const updateNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, type, description, link, buttonLabel } = req.body;

    const updatedNotification = await NotificationModel.findByIdAndUpdate(
      id,
      { title, type, description, link, buttonLabel },
      { new: true, runValidators: true }
    );

    if (!updatedNotification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.status(200).json({ message: "Notification updated", notification: updatedNotification });
  } catch (err) {
    res.status(500).json({ message: "Error updating notification", error: err.message });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await NotificationModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting notification", error: err.message });
  }
};
