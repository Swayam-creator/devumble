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
   
  const userIdExists = await User.findById(userId);
  if (!userIdExists) throw new ApiError(404, 'Invalid user ID');

  const doubleRequest = await ConnectionRequest.findOne({
    $or: [
      { senderId: senderId, recipientId: userId },
      { senderId: userId, recipientId: senderId },
    ],
  });

  if (doubleRequest) throw new ApiError(400, 'Multiple requests not allowed');

  
  const connection = new ConnectionRequest({
    senderId,
    recipientId: userId,
    status,
  });

  await connection.isSenderandUserSame(senderId);

  await connection.save();

 
  res
    .status(200)
    .json(new ApiResponse(200, connection, 'Connection request sent successfully'));
});
