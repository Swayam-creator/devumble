import express from 'express';
import { forgotPasswordController, getMe, otpController, updateProfileController } from '../controller/profile.controller.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';
import {updateValidator} from '../utils/validator.js'
const router=express();




router.get('/view',isAuthenticated,getMe);
router.patch('/update/edit',isAuthenticated,updateValidator,updateProfileController);
router.post('/forgot-password',forgotPasswordController);
router.post('/otp/verify/:userId',otpController);
router.post('/reset-password/:userId',forgotPasswordController);


export default router;