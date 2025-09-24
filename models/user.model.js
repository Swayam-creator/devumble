import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
    },
    gender:{
        type:String,
    }

},{timestamps:true});
const User=mongoose.model("User",userSchema);
export default User;