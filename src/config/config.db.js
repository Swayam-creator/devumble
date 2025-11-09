import mongoose from "mongoose";
import dotenv from "dotenv";
import { ApiError } from "../utils/ApiError.js";
import ConnectionRequest from "../models/connection.model.js";
import logger from "../logger.js";
const connectDB=async()=>{
    try {
        const connect=await mongoose.connect(process.env.MONGO_URI);
        logger.info("database connected successfully");
        await ConnectionRequest.ensureIndexSafe();
      logger.info('Indexes called successfully')
    } catch (error) {
        console.log("failed database connection" +error);
        // process.exit(1);
        throw new ApiError(error.code,error.message);
    }
     
}
export default connectDB;