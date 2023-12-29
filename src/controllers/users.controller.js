import { asyncHandlerPromises } from "../utils/asyncHandler.js";


const register = asyncHandlerPromises(async (req,res)=>{
    
    //get user details from frontend
    const {username, email, fullName, password } = req.body;

    //check if you are getting the data 
    console.log("username :",username,"email :", email,"full name :", fullName,"password :", password)

    if(!username || !email || !fullName || !password)
    {
        console.log("all feilds required")
    }
    res.status(200).json({
        message : "registered successfully"
    })
})

const check = asyncHandlerPromises(async (req,res)=>{
    
    res.status(200).json({
        message : "checking successfull"
    })
})



export { register, check };