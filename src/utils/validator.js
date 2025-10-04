import validator from 'validator';
import {ApiError} from './ApiError.js'
import { ApiResponse } from './ApiResponse.js';
import { STRONG_PASSWORD_OPTIONS ,ALLOWED_UPDATES} from '../constant.js';
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

export {singupValidator,loginValidator,updateValidator};