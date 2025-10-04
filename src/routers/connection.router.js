import express from 'express';

const router=express.Router();

router.post('/send/interested/:userId',connectionRequestController);
router.post('/send/ignored/:userId',connectionRequestController);
router.post('/review/accept/:requestId',connectionRequestController);
router.post('/review/reject/:requestId',connectionRequestController);