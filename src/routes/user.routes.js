import express from 'express';
import { register, login, verifyemail, me } from '../controllers/auth.controller.js';
import validateToken from '../middlewares/auth.middleware.js';

const userRouter = express.Router();


userRouter.route('/register').post(register);
userRouter.route('/verifyemail/:tokenId').get(verifyemail);
userRouter.route('/login').post(login);
userRouter.route('/me').get(validateToken, me)

export default userRouter;