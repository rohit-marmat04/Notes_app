import express from "express";
import { googleRegister, googleLogin } from "../controllers/auth.Controller.js";
import { auth } from "google-auth-library";

const authRouter = express.Router();

authRouter.post("/google-register", googleRegister);
authRouter.post("/google-login", googleLogin);

export default authRouter;