import express from 'express';
import { isAuthenticated } from '../middleware/auth.middleware.js';
import {requestRecievedController,getConnectionsController,getFeedController} from '../controller/user.controller.js'
const router=express.Router();
/**
 * @swagger
 * /api/v1/user/request/recieved:
 *   get:
 *     summary: Get received connection requests
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Requests fetched
 */
router.get('/request/recieved',isAuthenticated,requestRecievedController);
/**
 * @swagger
 * /api/v1/user/connections:
 *   get:
 *     summary: Get user connections
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 */

router.get('/connections',isAuthenticated,getConnectionsController);
/**
 * @swagger
 * /api/v1/user/feed:
 *   get:
 *     summary: Get user feed
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Feed fetched
 */

router.get('/feed',isAuthenticated,getFeedController);

export default router;