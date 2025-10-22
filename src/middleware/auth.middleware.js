import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';
import { COOKIE_OPTIONS } from '../constant.js';
export const isAuthenticated=async(req,res,next)=>{
    try {
        console.log("token "+     req.cookies.token);
        const token=req.cookies?.token;
        if(!token) return res.status(401).json(new ApiError(401,"Unauthorized"));
        if(token)console.log("Token found !! "+token );
        // const verify=jwt.verify(token,process.env.secretkey);
        // if(!verify) return res.status(403).json(new ApiError(403,"Invalid token"));
        const decoded=await jwt.verify(token,process.env.secretkey,COOKIE_OPTIONS);
        console.log("decoded"+decoded)
        req.user=decoded;
    } catch (error) {
        throw new ApiError(error.code,error.message);
    }
    next();
}