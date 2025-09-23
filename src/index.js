import express from 'express';
const app=express();

const PORT=8080;

app.get('/a', (req, res,next) => {
    try {
 console.log("log from /a+ route");
 throw new Error("New error from here");
  res.send("Hi from /a+ route");
    } catch (error) {
        next(error);
    }
},
);
app.use((err,req,res,next)=>{
    if(err){
        console.log("finding status from here"+err.stack);
        res.status(err.status||500).send({message:"You encountered an error"});
    }
})



app.listen(PORT,()=>{
    console.log(`Server started on ${PORT}`);
})