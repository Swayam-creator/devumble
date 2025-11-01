import express from 'express';
import { connectionRequestController, connectionReviewController } from '../controller/connection.controller.js';
import { connectionValidator,connectionReviewValidator } from '../utils/validator.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';
const router=express.Router();
router.post('/send/:status/:userId',isAuthenticated,connectionValidator,connectionRequestController);
router.post('/review/:reviewstatus/:requestId',isAuthenticated,connectionReviewValidator,connectionReviewController);

export default router;