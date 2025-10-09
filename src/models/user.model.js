import mongoose from "mongoose";
import bcrypt from "bcryptjs";
// import { trim } from "validator";
import dotenv from 'dotenv';
import { JWT_OPTIONS } from "../constant.js";
import jwt from 'jsonwebtoken';
dotenv.config();
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minlength:3,
        trim:true,
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        index:true
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
        enum:["male","female","others"],
    },
    profileImage:{
        type:String,
        default:"https://cdn-icons-png.flaticon.com/512/149/149071.png"
    },
    about:{
        type:String,
        default:"Hello, I am a developer",
    },
    skills:{
        type:[String],
    },
    projects:{
        type:[String]

    },
    profileCompleteNess:{
        type:Boolean,
        default:false
    },
    otp:{
        type:String,
    },
    otpExpires:{
        type:Date
    },

},{timestamps:true});

userSchema.methods.comparePassword=async function(inputPassword){
    return await bcrypt.compare(inputPassword,this.password);
}

userSchema.methods.getJWT=async function(){
    return await jwt.sign({_id:this._id,
     emailId:this.emailId,
     firstName:this.firstName,
     lastName:this.lastName,
 },process.env.secretkey,JWT_OPTIONS);
}

userSchema.pre('save',async function(next){
    if(this.isModified("password")){
        // console.log(process.env.hashRound)
        const saltRound=await bcrypt.genSalt(Number(process.env.hashRound));
    this.password=await bcrypt.hash(this.password,saltRound);
    }
    next();
});

const User=mongoose.model("User",userSchema);
export default User;