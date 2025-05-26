// creating error handling class

class ErrorHandler extends Error {
    constructor(message,statusCode){
        // parent class constructor is super 
        super(message)
        this.statusCode=statusCode;
        Error.captureStackTrace(this, this.constructor)
    }

}



module.exports=ErrorHandler;
