import express from 'express';
import { isAuthenticated } from '../middleware/auth.middleware.js';
import {requestRecievedController,getConnectionsController,getFeedController} from '../controller/user.controller.js'
const router=express.Router();

router.get('/request/recieved',isAuthenticated,requestRecievedController);
router.get('/connections',isAuthenticated,getConnectionsController);
router.get('/feed',isAuthenticated,getFeedController);

export default router;