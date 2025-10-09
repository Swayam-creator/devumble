import express from 'express';
import { connectionRequestController } from '../controller/connection.controller.js';
import { connectionValidator } from '../utils/validator.js';
import logger from '../logger.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';
const router=express.Router();
logger.info('Connection router loaded');
router.post('/send/:status/:userId',isAuthenticated,connectionValidator,connectionRequestController);
// router.post('/review/:reviewstatus/:requestId',isAuthenticated,connectionReviewController);

export default router;