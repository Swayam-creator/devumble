import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/config.db.js';
import cookieParser from 'cookie-parser';
import authRouter from './routers/auth.router.js'
import profileRouter from './routers/profile.router.js'
import logger from './logger.js';

const app=express();
dotenv.config({debug:true})
const PORT=process.env.PORT || 3000;
app.use(cookieParser());
app.use(express.json({limit:"16mb"}));
app.use(express.urlencoded({extended:true,limit:"16mb"}));
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/profile',profileRouter);
connectDB().then(()=>{
    app.listen(PORT,()=>{
    // console.log(`Server started on ${PORT}`);
    logger.info(`Server started on ${PORT}`)
});
}).catch((err)=>{
    logger.error(new Error(err.code +" : "+err.message));
})

app.get('/', (req, res,next) => {
  logger.info({message:'Hi from server!'})
},
);



