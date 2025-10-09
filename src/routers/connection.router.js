import express from 'express';
import { connectionRequestController, connectionReviewController } from '../controller/connection.controller.js';
import { connectionValidator } from '../utils/validator.js';
const router=express.Router();

router.post('/send/:status/:userId',connectionValidator,connectionRequestController);
router.post('/review/:reviewstatus/:requestId',connectionReviewController);
