import express from 'express';
import { forgotPasswordController, getMe, otpController, resetPasswordController, updateProfileController } from '../controller/profile.controller.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';
import {updateValidator} from '../utils/validator.js'
const router=express();
/**
 * @swagger
 * /api/v1/profile/view:
 *   get:
 *     summary: Get logged-in user profile
 *     tags: [Profile]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User profile fetched
 *       401:
 *         description: Unauthorized
 */
router.get('/view',isAuthenticated,getMe);
/**
 * @swagger
 * /api/v1/profile/update/edit:
 *   patch:
 *     summary: Update user profile
 *     tags: [Profile]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               bio:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 */
router.patch('/update/edit',isAuthenticated,updateValidator,updateProfileController);
/**
 * @swagger
 * /api/v1/profile/forgot-password:
 *   post:
 *     summary: Request password reset
 *     tags: [Profile]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP sent
 */
router.post('/forgot-password',forgotPasswordController);
/**
 * @swagger
 * /api/v1/profile/otp/verify/{userId}:
 *   post:
 *     summary: Verify OTP
 *     tags: [Profile]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OTP verified
 */
router.post('/otp/verify/:userId',otpController);
/**
 * @swagger
 * /api/v1/profile/reset-password/{userId}:
 *   post:
 *     summary: Reset password
 *     tags: [Profile]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successful
 */
router.post('/reset-password/:userId',resetPasswordController);


export default router;