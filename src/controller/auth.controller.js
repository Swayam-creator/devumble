import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { COOKIE_OPTIONS } from "../constant.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const SignupController=async(req,res)=>{
   const {firstName,lastName,emailId,password} = req.body;
    
    try {
        const userExists=await User.findOne({emailId});
        if(userExists){
            throw new Error(409,"User already exists");
        }
     const user={
      firstName,
      lastName,
      emailId,
      password
    }
    const createdUser=await User.create(user);
    res.status(201).json(new ApiResponse(200,createdUser,"User created successfully"));
    } catch (error) {
    console.log(error);
         throw new ApiError(error.code,error.message);
    }
}

export const LoginController=async(req,res)=>{
const {emailId,password}=req.body;
 try {
    const userExists=await User.findOne({emailId:emailId});
 if(!userExists){
    throw new ApiError(
     400,
     "Invalid credentials"
    );
 }
 const passwordMatch=await userExists.comparePassword(password);
 if(!passwordMatch) throw new ApiError(400,"Invalid credentials");
 const token=await userExists.getJWT(userExists._id);
 console.log(token)
 return res.status(200).cookie("token",token,COOKIE_OPTIONS).json(new ApiResponse(200,token,"login successful"));
 } catch (error) {
  throw new ApiError(error.code,error.message);  
 }
}

export const LogoutController=async(req,res)=>{
    try {
        return res.status(200).clearCookie("token").json(new ApiResponse(200,"",
        "logout successfull"
        ));
    } catch (error) {
        throw new ApiError(error.code,error.message);
    }
}