import express from 'express';
import { singupValidator, loginValidator } from '../utils/validator.js';
import { SignupController,LoginController,LogoutController } from '../controller/auth.controller.js';

const router=express.Router();

router.post('/signup',singupValidator,SignupController);
router.post('/login',loginValidator,LoginController);
router.post('/logout',LogoutController);
export default router;