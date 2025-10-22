import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import User from "../models/user.model.js";
import crypto from 'crypto'
import { sendEmail } from "../utils/send.email.js";
import { asyncHandler } from "../utils/AysncHandler.js";

// getMe controller
export const getMe=async(req,res)=>{
    const userId=req.user?._id;
    try {
        const userData=await User.findById(userId).select("-password").lean();
        res.status(200).json(new ApiResponse(200,userData,"User data fetched successfully"));
    } catch (error) {
        throw new ApiError(error.code,error.message);
    }   
}



// update profile controller
export const updateProfileController=async(req,res)=>{
    const userId=req.user?._id;
    console.log(userId);
    const data=req.body;
    const {firstName,lastName,emailId,profileImage,about,skills,projects} = data;
    try {
        
        const updateUserData=await User.findByIdAndUpdate(
            {_id:userId},
            {$set:data },
            {new:true});
        console.log(updateUserData);
        
        
        res.status(200).json(new ApiResponse(200,updateUserData,"User data updated successfully"));
    } catch (error) {
        throw new ApiError(error.code,error.message);
    }
}
// forgot password controller
export const forgotPasswordController=async(req,res)=>{
    try {
        const {emailId}=req.body;
        const user=await User.findOne({emailId});
        if(!user) throw new ApiError(400,'Invalid email Id');
        const otp=crypto.randomBytes(20).toString('utf8');
        user.otp=otp;
        user.otpExpires=Date.now()*5*60*1000;
        await user.save();
        const emailSent=await sendEmail(emailId,user._id,otp);
        if(emailSent){
          res.status(200).json({message:'Check your email Id for otp'});
        }
    } catch (error) {
        throw new ApiError(error.code,error.message);
    }
}
// otp controller 
export const otpController=asyncHandler(async(req,res)=>{
 const userId=req.params.userId;
 const user=await User.findById(userId);
 if(!user) throw new ApiError(404,'user not found');
 const otp=req.body;
 const userOtp=await User.findOne({otp,
    otpExpires:{$gt:Date.now()}
 });
 if(!userOtp) throw new ApiError(400,'reset time expired!!');
 return res.status(200).json(new ApiResponse(200,user,'Otp verified successfully'));
});

// reset password controller
export const resetPasswordController=asyncHandler(async(req,res)=>{
 const userId=req.params.userId;
 const user=await User.findById(userId);
 if(!user) throw new ApiError(404,'user not found');
 const {newPassword,confirmPassword}=req.body;
 if(newPassword!==confirmPassword)throw new ApiError(400,'All fields are required');
 user.password=newPassword;
 user.otp='';
 user.otpExpires='';
 await user.save();
 res.status(201).json(new ApiResponse(200,user,'Password changed successfully'));
});