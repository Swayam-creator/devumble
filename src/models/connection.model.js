import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";

const connectionRequestSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  recipientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['accepted', 'ignored', 'collab', 'nocollab'],
    required: true,
  },
}, { timestamps: true });


connectionRequestSchema.index({ senderId: 1, recipientId: 1 }, { unique: true });


connectionRequestSchema.methods.isSenderandUserSame = function () {
  try {
    return this.senderId.toString() === this.recipientId.toString();
  } catch (error) {
    throw new ApiError(500, error.message || 'Internal server error');
  }
};

const ConnectionRequest = mongoose.model('ConnectionRequest', connectionRequestSchema);
export default ConnectionRequest;
