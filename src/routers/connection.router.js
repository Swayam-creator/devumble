import express from 'express';
import { connectionRequestController, connectionReviewController } from '../controller/connection.controller.js';
import { connectionValidator,connectionReviewValidator } from '../utils/validator.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';
const router=express.Router();

/**
 * @swagger
 * /api/v1/request/send/{status}/{userId}:
 *   post:
 *     summary: Send connection request
 *     tags: [Connection]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Request sent
 */
router.post('/send/:status/:userId',isAuthenticated,connectionValidator,connectionRequestController);
/**
 * @swagger
 * /api/v1/request/review/{reviewstatus}/{requestId}:
 *   post:
 *     summary: Review connection request
 *     tags: [Connection]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: reviewstatus
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: requestId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Request reviewed
 */

router.post('/review/:reviewstatus/:requestId',isAuthenticated,connectionReviewValidator,connectionReviewController);

export default router;