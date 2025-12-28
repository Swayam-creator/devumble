import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/config.db.js';
import { serve,setup } from 'swagger-ui-express';
import swaggerSpecDoc from './utils/swagger.js';
import cookieParser from 'cookie-parser';
import authRouter from './routers/auth.router.js'
import profileRouter from './routers/profile.router.js'
import connectionRouter from './routers/connection.router.js'
import userRouter from './routers/user.router.js'
import logger from './logger.js';
import cors from 'cors';
import { errorHandler } from './utils/errorHandler.js';
const app=express();
dotenv.config({})

const PORT=process.env.PORT || 3000;

// middlewares
app.use(cors({
  origin:process.env.BASE_URL,
  methods:["GET","POST","PATCH","PUT","DELETE"],
  allowedHeaders:['Content-Type','Authorization','Accept'],
  credentials:true,
}));

app.use('/api-docs',serve,setup(swaggerSpecDoc))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// api routes 
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/profile',profileRouter);
app.use('/api/v1/request',connectionRouter);
app.use('/api/v1/user',userRouter);
app.use(errorHandler);

app.get('/', (req, res,next) => {
  res.send('we deployed');
  logger.info({message:'Hi from server!'})
},
);
// Db connection
connectDB().then(()=>{
    app.listen(PORT,()=>{
    logger.info(`Server started on ${PORT}`)
});
}).catch((err)=>{
    logger.error(new Error(err.code +" : "+err.message));
})

// healthcheck



