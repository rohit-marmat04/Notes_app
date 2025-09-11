import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['job', 'internship', 'training', 'update'], required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
  buttonLabel: { type: String, default: 'Apply' },
  createdAt: { type: Date, default: Date.now }
});

const NotificationModel = mongoose.model("Notification", notificationSchema);
export default NotificationModel;
