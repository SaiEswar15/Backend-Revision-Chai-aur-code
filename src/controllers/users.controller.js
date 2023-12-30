
const {ApiResponse} = require("../utils/apiResponse.js");
const userSchema = require("../models/users.models.js").users;
const {uploadOnCloudinary} = require("../utils/cloudinary.js");
const {asyncHandlerPromises} = require("../utils/asyncHandler.js");
const ApiErrors = require("../utils/apiErrors.js");

const register = asyncHandlerPromises(async (req,res)=>{
    
    //get user details from frontend
    const {username, email, fullname, password } = req.body;

    console.log(username, email, fullname, password )

    //validate if all feilds are present or not 
    if([ username, email, fullname, password ].some((el)=> el?.trim() === "" || undefined))
    {
        throw new ApiErrors(400, "All feilds required")
    }

    //if user already exists or not 
    const existUser = await userSchema.findOne({$or : [{email},{username}]})

    if(existUser)
    {
        throw new ApiErrors(301, "user already exist")
    }

    console.log(req.files, "req.files")
    //get user files
    const avatarLocalPath = req.files?.avatar[0]?.path;
    console.log(avatarLocalPath, "avatarLocalPath");
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    

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



module.exports =  { register, check };