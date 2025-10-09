import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import {asyncHandler} from '../utils/AysncHandler.js'
const connectionRequestSchema=new mongoose.Schema({
senderId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    unique:true,
},
recipientId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    unique:true,
},
status:{
    type:String,
    enum:['accepted','ignored','collab','notcollab']
}
});

connectionRequestSchema.methods=asyncHandler(async(userId)=>{
    try {
        if(req.user?._id===userId){
            throw new ApiError(400,"'you can't send connection request to yourself'");
        }
    } catch (error) {
        throw new ApiError(error.code,error.message);
    }
    next();
});

const ConnectionRequest = mongoose.model('ConnectionRequest',connectionRequestSchema);
export default ConnectionRequest;