import nodemailer from 'nodemailer';

import logger from '../logger.js';
export const sendEmail=async(email,userId,otp)=>{
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, 
  auth: {
    user: process.env.YOUR_GMAIL_ADDRESS,
    pass: process.env.YOUR_APP_PASSWORD,
  }
});

// Configure the mailoptions object
const mailOptions = {
  from: process.env.YOUR_GMAIL_ADDRESS,
  to: email,
  subject: 'Reset Password',
  text: `Your OTP is ${otp}
      click on link ${process.env.CLIENT_URL}/otp/verify/${userId}
  `
};

// Send the email

const responseEmail=transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    logger.error(error);
  } else {
   logger.info('Email sent: ' + info.response);
  }
});

return responseEmail;
}