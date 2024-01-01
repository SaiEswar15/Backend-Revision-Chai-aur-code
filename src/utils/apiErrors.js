//standardizing the api errors 
//we already have the Error class which we will overwrite

class ApiErrors extends Error 
{
    constructor(statusCode, message = "something went wrong", errors = [], stack = "" )
    {
        super(message)
        this.statusCode = statusCode
        this.data = null //read about this
        this.message = message
        this.success = false
        this.errors = errors

        if(stack)
        {
            this.stack = stack
        }
        else
        {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {ApiErrors} 