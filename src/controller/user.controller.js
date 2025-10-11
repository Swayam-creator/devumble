import ConnectionRequest from '../models/connection.model.js'
import { asyncHandler } from '../utils/AysncHandler.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import logger from '../logger.js';
import User from '../models/user.model.js';

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

   const connectionsData=await ConnectionRequest.find({
    $or:[
        {
            senderId:loggedInUser,
            status:'accepted',
        },
        {
            recipientId:loggedInUser,
            status:'accepted',
        }
    ],
    
   })
   .populate('senderId',"firstName lastName emailId about gender")
   .populate('recipientId',"firstName lastName emailId about gender");
  const connections=connectionsData.map((row)=>{
    if(row.senderId._id.toString()===loggedInUser.toString())  return row.recipientId;
    return row.senderId;
  });

   if(connectionsData==null) return res.status(200).json(new ApiResponse(200,connections,"'You don't have any connections yet'"));

  return res.status(200).json(new ApiResponse(200,connections,"Connections data recieved successfully"));

});


export const getFeedController=asyncHandler(async(req,res)=>{
  // create a set of user who are someway or the other connected to the logged user or had any previous interaction
  // Then fetch the data from User model and ensure that the user is not the logged in user and this set is utilized 
  const loggedInUser=req.user?._id;
  let limit=req.query.limit || 10;
  let page=req.query.skip || 1;
  limit=limit>50?50:limit;
   page=(page-1)*limit;
  const connectionsData=await ConnectionRequest.find({
   
    $or:[
        {
            senderId:loggedInUser,
        },
        {
            recipientId:loggedInUser
        }
    ]
  }).select("senderId recipientId");
  const requestconnectionsSet=new Set();
 connectionsData.map((req)=>{
    requestconnectionsSet.add(req.senderId.toString());
    requestconnectionsSet.add(req.recipientId.toString());
 });
  logger.info(requestconnectionsSet);

  const UserFeed=await User.find({
    $and:[{
        _id:{$nin:[
          requestconnectionsSet 
        ]},
        _id:{$ne: loggedInUser._id }
    }
    ]
  }).select("firstName lastName about skills gender")
  .select("-password")
  .skip(page)
  .limit(limit)
 return res.status(200).json(new ApiResponse(200,UserFeed,'Data sent successfully'));
});
