import { ALLOWED_UPDATES } from "../constant.js";
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import User from "../models/user.model.js";
export const getMe=async(req,res)=>{
    const userId=req.user?._id;
    try {
        const userData=await User.findById(userId).lean();
        res.status(200).json(new ApiResponse(200,userData,"User data fetched successfully"));
    } catch (error) {
        throw new ApiError(error.code,error.message);
    }   
}




export const updateProfileController=async(req,res)=>{
    const userId=req.user?._id;
    console.log(userId);
    const data=req.body;
    try {
        let isValiddata=Object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k));
        if(!isValiddata){
           return res.status(400).json(new ApiResponse(400,data,"Invalid user data"));
        }
        if(data.skills.length>10){
            throw new ApiError(400,"You can't add skills more than 10");
        }
        if(data.projects.length>5){
            throw new ApiError(400,"You can't add projects more than 5");
        }
        const updateUserData=await User.findByIdAndUpdate(
            {_id:userId},
            {$set:{firstName:firstName} },
            {new:"true"}).lean();
        console.log(updateUserData);
        res.status(200).json(new ApiResponse(200,updateUserData,"User data updated successfully"));
    } catch (error) {
        throw new ApiError(error.code,error.message);
    }
}