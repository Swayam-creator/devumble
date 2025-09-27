import validator from 'validator';
import {ApiError} from './ApiError.js'
import { STRONG_PASSWORD_OPTIONS } from '../constant.js';
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

export {singupValidator,loginValidator};