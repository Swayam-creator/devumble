import express from 'express';
import { getMe, updateProfileController } from '../controller/profile.controller.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';
import {updateValidator} from '../utils/validator.js'
const router=express();




router.get('/view',isAuthenticated,getMe);
router.patch('/update/:userId',isAuthenticated,updateValidator,updateProfileController)

export default router;