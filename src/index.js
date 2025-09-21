import express from 'express';
const app=express();

const PORT=8080;

app.use('/',(req,res)=>{
    res.send("Hi from root route")
})

app.listen(PORT,()=>{
    console.log(`Server started on ${PORT}`);
})