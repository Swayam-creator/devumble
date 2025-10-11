import ConnectionRequest from '../models/connection.model.js'
import { asyncHandler } from '../utils/AysncHandler.js'
import {ApiResponse} from '../utils/ApiResponse.js'

export const requestRecievedController=asyncHandler(async(req,res)=>{
 const loggedInUser=req.user?._id;

 const requestRecievedData=await ConnectionRequest.findOne({
    recipientId:loggedInUser,
    status:'accepted'
 }).populate('senderId',"firstName lastName emailId skills projects gender profileImage about");

 

   return res.status(200).json(new ApiResponse(200,requestRecievedData,'request recieved data fetched successfully'));

});
// connections api
export const getConnectionsController=asyncHandler(async(req,res)=>{
const loggedInUser=req.user?._id;

   const connectionsData=await ConnectionRequest.findOne({
    $or:[
        {
            senderId:loggedInUser,
        },
        {
            recipientId:loggedInUser
        }
    ],
    status:'accepted',
   })
   .populate('senderId',"firstName lastName emailId about gender")
   .populate('recipientId',"firstName lastName emailId about gender")
   .lean();


   if(connectionsData==null) return res.status(200).json(new ApiResponse(200,connectionsData,"'You don't have any connections yet'"));

  return res.status(200).json(new ApiResponse(200,connectionsData,"Connections data recieved successfully"));

});


export const getFeedController=asyncHandler(async(req,res)=>{

});
