import express from "express";
import { addNotification, getNotifications, updateNotification, deleteNotification } from "../controllers/notification.controller.js";

const notificationRouter = express.Router();

notificationRouter.post("/addnotifications", addNotification);     // Admin only
notificationRouter.get("/getnotifications", getNotifications);
notificationRouter.put("/updatenotifications", updateNotification);
notificationRouter.delete("/deletenotifications", deleteNotification);     // Public

export default notificationRouter;
