import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import {asyncHandler} from '../utils/AysncHandler.js'
const connectionRequestSchema=new mongoose.Schema({
senderId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',

},
recipientId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
},
status:{
    type:String,
    enum:['accepted','ignored','collab','nocollab']
}
});

connectionRequestSchema.methods.isSenderandUserSame=async function (userId) {
    try {
        if (this._id.toString() === userId.toString()) {
            throw new ApiError(400, "You can't send a connection request to yourself");
        }
        return true; 
    } catch (error) {
        throw new ApiError(error.code || 500, error.message || 'Internal server error');
    }
};

const ConnectionRequest = mongoose.model('ConnectionRequest',connectionRequestSchema);
export default ConnectionRequest;