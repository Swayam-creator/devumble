import validator from 'validator';
import {ApiError} from './ApiError.js'
import { ApiResponse } from './ApiResponse.js';
import { STRONG_PASSWORD_OPTIONS ,ALLOWED_UPDATES, ALLOWED_CONNECTION_REQUEST_STATUS, ALLOWED_CONNECTION_REVIEW_STATUS} from '../constant.js';
import mongoose from 'mongoose';
const singupValidator=(req,res,next)=>{
    const {firstName,lastName,emailId,password} = req.body;
    //  required fields 
    if(validator.isEmpty(firstName) || validator.isEmpty(lastName) || validator.isEmpty(emailId) ||validator.isEmpty(password)){
     throw new ApiError(400,"All fields are required");
    }
    // email validation
    if(!validator.isEmail(emailId) || !emailId.endsWith("@gmail.com")){
        throw new ApiError(400,"Invalid email address");
    }
    if(!validator.isStrongPassword(password,STRONG_PASSWORD_OPTIONS)){
       throw new ApiError(400,"Weak password");
    }

    next();
}
const loginValidator=(req,res,next)=>{
    const {emailId,password} = req.body;
    //  required fields 
    if(validator.isEmpty(emailId) || validator.isEmpty(password)){
     throw new ApiError(400,"All fields are required");
    }
    if(!validator.isStrongPassword(password,STRONG_PASSWORD_OPTIONS)){
       throw new ApiError(400,"Weak password");
    }
    if(!validator.isEmail(emailId) || !emailId.endsWith("@gmail.com")){
        throw new ApiError(400,"Invalid email address");
    }
    next(); 
}
const updateValidator=(req,res,next)=>{
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
    } catch (error) {
        throw new ApiError(error.code,error.message);
    }
    next();
}

/// connection validation
const connectionValidator=(req,res,next)=>{
const status=req.params.status;
const validStatus=ALLOWED_CONNECTION_REQUEST_STATUS.includes(status);
if(!validStatus){ throw new ApiError('Invalid status passed');}
const userId=req.params.userId;
if(!mongoose.isValidObjectId(userId)){
    throw new ApiError(400,'Invalid object id');
}
next();
}

const connectionReviewValidator=(req,res,next)=>{
     const {reviewstatus,requestId}=req.params;
     const validStatus=ALLOWED_CONNECTION_REVIEW_STATUS.includes(reviewstatus); 
     if(!validStatus)  return res.status(400).json(new ApiError(400,'Invalid status'));
     const validRequestId=mongoose.isValidObjectId(requestId);
     if(!validRequestId) throw new ApiError(400,'Invalid object id');

    next();
}






export {singupValidator,loginValidator,updateValidator,connectionValidator,connectionReviewValidator};