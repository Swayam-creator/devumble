import mongoose from "mongoose";
import dotenv from "dotenv";
const connectDB=async()=>{
    try {
        const connect=await mongoose.connect(process.env.MONGO_URI);
        console.log("database connected successfully");
    } catch (error) {
        console.log("failed database connection");
        process.exit(1);
    }
     
}
export default connectDB;