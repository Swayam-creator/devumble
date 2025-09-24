import express from 'express';
import dotenv from 'dotenv';
import connectDB from '../config/config.db.js';
import { ApiError } from '../utils/ApiError.js';
import User from '../models/user.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
const app=express();
dotenv.config({debug:true})
const PORT=process.env.PORT || 3000;
app.use(express.json({limit:"16mb"}));
app.use(express.urlencoded({extended:true,limit:"16mb"}));
app.get('/', (req, res,next) => {
  console.log("Hi from our server!!")
},
);

app.post('/signup',async(req,res)=>{
    const {firstName,lastName,emailId,password} = req.body;
    
    if(!firstName || !lastName || !emailId || !password){
      throw new ApiError(400,"All fields are required");
    }
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
         throw new ApiError(409,"User already exists");
    }
    
})

app.patch('/update',async(req,res)=>{
    const {userId,firstName}=req.body;
    try {
        const updateUserData=await User.findByIdAndUpdate(
            {_id:userId},
            {$set:{firstName:firstName} },
            {new:"true"}).lean();
        console.log(updateUserData);
        res.status(200).json(new ApiResponse(200,updateUserData,"User data updated successfully"));
    } catch (error) {
        throw new ApiError(error.code,error.message);
    }
})

connectDB().then(()=>{
    app.listen(PORT,()=>{
    console.log(`Server started on ${PORT}`);})
}).catch((err)=>{
    console.log(`Unable to start the server`);
})
