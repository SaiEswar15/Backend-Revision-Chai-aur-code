import { asyncHandlerPromises } from "../utils/asyncHandler.js";
import {ApiErrors} from "../utils/apiErrors.js";
import {ApiResponse} from "../utils/apiResponse.js";
import { users as userSchema } from "../models/users.models.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"

const register = asyncHandlerPromises(async (req,res)=>{
    
    //get user details from frontend
    const {username, email, fullName, password } = req.body;
    // console.log(username, email, fullName, password);

    //validate if all feilds are present or not 
    if([ username, email, fullName, password ].some((el)=> el?.trim() === ""))
    {
        throw new ApiErrors(400, "All feilds required")
    }

    //check if user already exists or not 
    const existUser = await userSchema.findOne({$or : [{email},{username}]})

    if(existUser)
    {
        throw new ApiErrors(301, "user already exist")
    }

    // console.log("files", req.files)

    //get user files path
    const avatarLocalPath = req.files?.avatar[0]?.path;

    //step 29 : refer
    //const coverImageLocalPath = req.files?.coverImage[0]?.path; 
    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }

    // console.log("avatarLocalPath :", avatarLocalPath)
    // console.log("coverImageLocalPath :", coverImageLocalPath)

    //no gaurentte if they are present or not - so validation
    if (!avatarLocalPath)
    {
        throw new ApiErrors(409, "problem uploading avatar")
    }

    //now we have path and we have to  upload to cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    //check if they are uploaded successfully or not 
    if (!avatar)
    {
        throw new ApiErrors(500, "problem uploading avatar in cloudinary")
    }

    //create object and put in database
    const user = await userSchema.create({
        email,
        password,
        fullName,
        avatar : avatar.url,
        coverImage : coverImage?.url || null,
        username : username.toLowerCase() 

    })

    //check if user is present or not in db
    const updatedUser = await userSchema.findById(user._id).select("-password -refreshToken")

    if(!updatedUser) throw new ApiErrors(500, "failed registering user")
    
    res.status(200).json(new ApiResponse(200, updatedUser, "user registered successfully"))
})

const check = asyncHandlerPromises(async (req,res)=>{
    
    res.status(200).json({
        message : "checking successfull"
    })
})



export { register, check };