import { asyncHandler } from '../utils/AysncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import logger from '../logger.js';
import ConnectionRequest from '../models/connection.model.js';
import User from '../models/user.model.js';

export const connectionRequestController = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const senderId = req.user._id;
  const status = req.params.status;
  
   
  const userIdExists = await User.findById(userId).select('-password');
 
  if (!userIdExists) throw new ApiError(404, 'Invalid user ID');

  const doubleRequest = await ConnectionRequest.findOne({
    $or: [
      { senderId: senderId, recipientId: userId },
      { senderId: userId, recipientId: senderId },
    ], 
  });
  if (doubleRequest) { 
     logger.info(doubleRequest);
    return res.status(400).json( new ApiError(400, 'Multiple requests not allowed'));}
  const connection = new ConnectionRequest({
    senderId,
    recipientId: userId,
    status,
  });
  const sameUserCheck=await connection.isSenderandUserSame();
  if (sameUserCheck){
 
    throw new ApiError(400, "You can't send a connection request to yourself");}
   
   try {
  
    await connection.save();
   } catch (error) {
    throw new ApiError(500, "Failed to save connection: " + error.message);
   }
 
  res
    .status(200)
    .json(new ApiResponse(200, connection, 'Connection request sent successfully'));
});


export const connectionReviewController = asyncHandler(async (req, res, next) => {
  const { reviewstatus, requestId } = req.params;
  const recipientId = req.user?._id;

  logger.info(`Requested status change to: ${reviewstatus}`);
  logger.info(`Request ID: ${requestId}`);
  logger.info(`Recipient ID: ${recipientId}`);

  if (!reviewstatus || !requestId) {
    throw new ApiError(400, "Missing reviewstatus or requestId in parameters");
  }

  const connectionReview = await ConnectionRequest.findOne({
    _id: requestId,
    recipientId: recipientId,
  });

  if (!connectionReview) {
    logger.error("No connection request found for this user or invalid ID");
    return res.status(404).json(
      new ApiResponse(404, null, "Connection request not found or unauthorized")
    );
  }


  connectionReview.status = reviewstatus;
  const updatedConnection = await connectionReview.save();

  logger.info(`Connection status updated to: ${updatedConnection.status}`);

  return res
    .status(200)
    .json(new ApiResponse(200, updatedConnection, "Status updated successfully"));
});
