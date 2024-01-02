//what does this middleware do ?
//just verify if user is present or not.

import { ApiErrors } from "../utils/apiErrors.js";
import { asyncHandlerPromises } from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken"
import { users as userSchema } from "../models/users.models.js";

const verify = asyncHandlerPromises(async(req, _ ,next)=>{

    try {
        //now get the access and refresh tokens. but how ?
        //simply we have the cookies and they are present in req, res
    
        //why do we need to check if cookie is present or not 
        //we have clearly sent which logging in user 
        //answer : what if the user is using mobile there will be no cookies for mobile user
        const accessToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    
        if(!accessToken) throw new ApiErrors(401, "Unauthorized request")
        
        //now that we have token we have to send this to verify jwt token so that we
        //will get the {_id, username, email} object
    
        const decodedToken = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    
        //if (!decodedToken) throw new ApiErrors(401, "token couldnt find user")
    
        //check with the id weather the user is present in database or not
        const user = await userSchema.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!user){
            //todo : dicussion about frontend
            throw new ApiErrors(401, "access token invalid")
        } 
    
        //add object to request
        req.user = user ;
        
        next();
    } 
    catch (error) 
    {
        throw new ApiErrors(401, error?.message || "Invalid access Token")
    }
})

export {verify}