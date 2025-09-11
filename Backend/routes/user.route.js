import express from 'express';
import { registerUserController, loginUserController, logoutUserController, getUserProfileController, updateUserProfileController } from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.post('/register', registerUserController);
userRouter.post('/login', loginUserController);
userRouter.post('/logout', logoutUserController);
userRouter.get('/profile', getUserProfileController);
userRouter.put('/update', updateUserProfileController);

export default userRouter;
