import express from "express";
import { sendEmail } from '../controllers/contact.controller.js';

const emailRouter = express.Router();

emailRouter.post("/emailsupport", sendEmail);

export default emailRouter;