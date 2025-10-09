import { asyncHandler } from '../utils/AysncHandler.js';
import {ApiError} from '../utils/ApiError.js'
import ConnectionRequest from '../models/connection.model.js';
export const connectionRequestController=asyncHandler(async(req,res)=>{
   const userId=req.params.userId;
   const senderId=req.user._id;
   const status=req.params.status;

    const userIdExists=await User.findById(userId);
    if(!userIdExists) throw new ApiError(404,'Invalid user Id');
     const doubleRequest=await ConnectionRequest.findOne({
        $or:[
            {senderId:senderId,recipientId:userId},
            {senderId:userId,recipientId:senderId},

        ]
     });
     if(doubleRequest)  throw new ApiError(400,"Multiple request not allowed");
      const val=ConnectionRequest.isSenderandUserSame(userId);
    
     
     // now that all checks are passed we can create our connection

     const connection=await ConnectionRequest.create({
        senderId:senderId,
        recipientId:userId,
        status:status
     });

     res.status(200).json(new ApiResponse(200,connection,'Connection request sent successfully'));

});


export const connectionReviewController=asyncHandler(async(req,res)=>{

});