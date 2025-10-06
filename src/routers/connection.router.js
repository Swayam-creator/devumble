import express from 'express';

const router=express.Router();

router.post('/send/:status/:userId',connectionRequestController);
router.post('/review/:reviewstatus/:requestId',connectionRequestController);
