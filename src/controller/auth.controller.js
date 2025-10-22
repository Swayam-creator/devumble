import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { COOKIE_OPTIONS } from "../constant.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AysncHandler.js";
export const SignupController = asyncHandler(async (req, res) => {
  const { firstName, lastName, emailId, password } = req.body;

  const userExists = await User.findOne({ emailId });
  if (userExists) {
    throw new ApiError(409, "User already exists");
  }

  const createdUser = await User.create({
    firstName,
    lastName,
    emailId,
    password,
  });

  const signedUser = await User.findById(createdUser._id).select("-password");

  return res
    .status(201)
    .json(new ApiResponse(201, signedUser, "User created successfully"));
});

export const LoginController=asyncHandler(async(req,res)=>{
const {emailId,password}=req.body;
//  console.log(emailId,password)
 
    const userExists=await User.findOne({emailId:emailId});
 if(!userExists){
    throw new ApiError(
     400,
     "Invalid credentials"
    );
 }
 const passwordMatch=await userExists.comparePassword(password);
 if(!passwordMatch) return res.status(400).json(new ApiError(400,"Invalid credentials"));
 const token=await userExists.getJWT(userExists._id);
 console.log(token)
 const user=await User.findById(userExists._id).select("-password");
 return res.status(200).cookie("token",token,COOKIE_OPTIONS).json(new ApiResponse(200,user,"login successful"));
 }
);

export const LogoutController=asyncHandler(async(req,res)=>{
    try {
        return res.status(200).clearCookie("token").json(new ApiResponse(200,"",
        "logout successfull"
        ));
    } catch (error) {
        throw new ApiError(error.code,error.message);
    }
});