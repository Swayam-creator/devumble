import mongoose from "mongoose";
import dotenv from "dotenv";
import { ApiError } from "../utils/ApiError.js";
const connectDB=async()=>{
    try {
        const connect=await mongoose.connect(process.env.MONGO_URI);
        console.log("database connected successfully");
    } catch (error) {
        console.log("failed database connection" +error);
        // process.exit(1);
        throw new ApiError(error.code,error.message);
    }
     
}
export default connectDB;