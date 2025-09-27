class ApiError extends Error{
    constructor(
        statusCode,
        message="Something went wrong",
        errors=[],
        stack=""
    ){
      super(message);
      this.statusCode=statusCode;
      this.message=message;
      this.error=errors;
      this.success=statusCode<400 || false;
      this.data=null;
      if(stack){
        this.stack=stack;
      }
      else{
        Error.captureStackTrace(this,this.constructor)
      }
    }
}
export {ApiError};
