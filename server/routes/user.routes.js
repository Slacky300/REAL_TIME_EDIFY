import express from 'express';
import { register, login, verifyemail } from '../controllers/auth.controller.js';

const userRouter = express.Router();


userRouter.route('/register').post(register);
userRouter.route('/verifyemail/:tokenId').get(verifyemail);
userRouter.route('/login').post(login);

export default userRouter;