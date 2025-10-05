const asyncHandler=(requestHandler)=>{
    return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err)=>{
            res.status(err.code || 500).json(err.message);
        })
    }
}
export {asyncHandler};