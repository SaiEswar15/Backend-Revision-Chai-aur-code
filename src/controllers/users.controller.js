import { asyncHandlerPromises } from "../utils/asyncHandler.js";
import {ApiErrors} from "../utils/apiErrors.js";
import {ApiResponse} from "../utils/apiResponse.js";
import { users as userSchema } from "../models/users.models.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import jwt from "jsonwebtoken"

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

const generateAccessAndRefreshTokens = async(userId)=>{
    // console.log(userId, "user id in generate tokens")
    try
    {
        const user = await userSchema.findById(userId)
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        //check if tokens are generated or not (optional)
        if(!accessToken && !refreshToken) throw new ApiErrors(501, "error generating token 1")
        //add refresh token to database
        user.refreshToken = refreshToken
        await user.save( {validateBeforeSave : false} );

        return {accessToken, refreshToken}

    }
    catch(error)
    {
        throw new ApiErrors(500, "something went wrong generating tokens")
    }

}

const loginUser = asyncHandlerPromises(async (req,res)=>{

    const {username, email, password} = req.body;
    // console.log(username, email);

    if( !username && !email )
    {
        throw new ApiErrors(401, "Either username or email required")
    }

    if(!password)
    {
        throw new ApiErrors(401, "Password required")
    }

    const user = await userSchema.findOne({$or : [{email},{username}] })

    if(!user) throw new ApiErrors(404 ,"user does not exist") 

    const isValidatePassword = await user.isPasswordCorrect(password)

    if(!isValidatePassword) throw new ApiErrors(401, "Wrong password")

    // console.log(user, "user after validation")

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)

    if(!accessToken && !refreshToken) throw new ApiErrors(501, "error generating token")

    //here we can directly send the destructured tokens (or)
    //you can send the user object but it is not updated with token so 
    //first we have to update the object and send it to cookie if all data is required (or)
    //you can make another call to db with the id and then send to cookie
    //optional step

    const updatedUser = await userSchema.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly : true,
        secure : true
    }

    return res
    .status(200)
    .cookie("accessToken" , accessToken, options)
    .cookie("refreshToken" , refreshToken, options)
    .json(
        new ApiResponse(200, {
            user : updatedUser,
            accessToken,
            refreshToken
        },
        "user logged In succesfully")
    )
})

const logoutUser = asyncHandlerPromises(async (req,res)=>{
    
    //now we have _id inside req.body
    //find by id and delete refreshtoken

    // console.log(req.user, "req.user")

    const user = await userSchema.findByIdAndUpdate({_id : req.user._id}, 
        {
            $set : 
            {
                refreshToken : ""
            }
        },
        {
            new : true  //gives you the updated document  
        }
    )

    // console.log(user, "updated user")

    if(user.refreshToken) throw new ApiErrors(501, "failed to remove refresh token from database")

    const options = {
        httpOnly : true,
        secure : true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200,user, "user logged out successfully"))


})

const refreshingAccessAndRefreshTokens = asyncHandlerPromises(async(req,res)=>{

    //getting the tokens from cookies and destructure
    const incomingRefreshToken = req.cookies.refreshToken || req.body || req.headers("Authorization")?.replace("Bearer", "")

    if(!incomingRefreshToken) throw new ApiErrors(401, "Unauthorized Request")

    try {
        //decode the refresh token by jwt modify to get _id
        const decoded = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
    
        if(!decoded ) throw new ApiErrors(401, "Invalid refresh token")
    
        //use the _id to get user data from db
        const user = await userSchema.findById(decoded._id)
    
        if(!user) throw new ApiErrors(401, "Couldn't find the user")
    
        const DBrefreshToken = user.refreshToken
    
        //check if refresh tokens matches
        if(incomingRefreshToken !== DBrefreshToken) throw new ApiErrors(401, "Refresh token expired")
    
        //generate new tokens and update to database 
        const { accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)
    
        const options = {
            httpOnly : true,
            secure : true
        }
    
        //update the cookies
        return res
        .status(200)
        .cookie("accessToken" , accessToken, options)
        .cookie("refreshToken" , refreshToken, options)
        .json(
            200,
            {
                "accessToken" : accessToken,
                "refreshToken" : refreshToken
            },
            "new access tokens generated"
        )
    } 
    catch (error) 
    {
        throw new ApiErrors(401, error.message || "Invalid refresh token")
    }
})

const updatePassword = asyncHandlerPromises(async(req,res)=>{

    const { oldPassword, newPassword, confirmPassword } = req.body

    if(!( oldPassword || newPassword || confirmPassword)) throw new ApiErrors(401, "all feilds required")
    
    //checking new and confirm are same
    if(newPassword !== confirmPassword) throw new ApiErrors(402, "passwords mismatch")

    //find the user with id which you will get from req.user from verify middleware
    const user = await userSchema.findById(req.user?._id)
    if(!user) throw new ApiErrors(401, "Invalid Tokens")

    const validatePassword = await user.isPasswordCorrect(oldPassword)
    if(!validatePassword) throw new ApiErrors(401, "Invalid credientials")

    user.password = newPassword
    await user.save({validateBeforeSave : false}) //before saving it will bcrypt and save to db

    const validateNewPassword = await user.isPasswordCorrect(newPassword)
    if(!validateNewPassword) throw new ApiErrors(501, "Error changing to new password")
    // userSchema.isPasswordCorrect()

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "password changed successfully"))

})

const getUserDetails = asyncHandlerPromises(async(req,res)=>{

    const user = req.user;
    return res.status(200).json(new ApiResponse(200, user, "Fetching user data successful"))
})

const changeUserDetails = asyncHandlerPromises(async(req,res)=>{

    const feildsToUpdate = req.body

    if(!(fullName || email)) throw new ApiErrors(401, "Feilds required")

    const user = await userSchema.findByIdAndUpdate(req.user?._id,
        {
            $set : {
                fullName : feildsToUpdate.fullName,
                email : feildsToUpdate.email
            }
        },
        {
            new : true
        }).select("-password -refreshToken")

    if(!user) throw new ApiErrors(401, "Invalid Tokens")

    // if(feildsToUpdate.fullName === user.fullName) throw new ApiErrors(401, "Cannot change items same feilds")

    return res
    .status(200)
    .json(new ApiResponse(200, user ,"user data updated successfully"))
})

const updateAvatar = asyncHandlerPromises(async(req,res)=>{

    const avatarLocalPath = req.file?.avatar?.path
    if(!avatarLocalPath) throw new ApiErrors(401, "avatar path missing")

    const avatarUrl = await uploadOnCloudinary(avatarLocalPath)
    if(!avatarUrl) throw new ApiErrors(401, "Error uploading to cloudinary")

    const user = await userSchema.findByIdAndUpdate(
        req.user?._id,
        {
            $set : 
            {
                avatar : avatarUrl
            }
        },
        {
            new : true
        }).select("-password -refreshToken")

    return res
    .status(200)
    .json(new ApiResponse(200, user ,"avatar updated successfully"))
    
})

const updateCoverImage = asyncHandlerPromises(async(req,res)=>{

    const coverImageLocalPath = req.file?.coverImage?.path
    if(!coverImageLocalPath) throw new ApiErrors(401, "cover image path missing")

    const coverImageUrl = await uploadOnCloudinary(coverImageLocalPath)
    if(!coverImageUrl ) throw new ApiErrors(401, "Error uploading coverImage to cloudinary")

    const user = await userSchema.findByIdAndUpdate(
        req.user?._id,
        {
            $set : 
            {
                coverImage : coverImageUrl
            }
        },
        {
            new : true
        }).select("-password -refreshToken")

    return res
    .status(200)
    .json(new ApiResponse(200, user ,"Cover Image updated successfully"))
    
})

const getUserChannelProfile = asyncHandlerPromises(async(req,res)=>{

    //we will get the details with req.params
    const {username} = req.params;

    if(!username?.trim()) throw new ApiErrors(501, "Error recieving the username")

    const channelDetails = await userSchema.aggregate([
        {
            $match : {
                username : username?.toLowerCase()
            }
        },
        {
            $lookup : {
                from : "subscriptions",
                localField : "$_id",
                foreignField : "$channel",
                as : "subscribers"
            }
        },
        {
            $lookup : {
                from : "subscriptions",
                localField : "$_id",
                foreignField : "$subscriber",
                as : "subscribedTo"
            }
        },
        {
            $addFields : {

                subscribersCount : {
                    $size : "$subscribers" 
                },
                subscriberedToChannelsCount : {
                    $size : "$subscribedTo"
                },
                isSubscribed : {
                    $cond : {
                        if : { $in : [req.user?.username, "$subscribers.subscriber"] },
                        then : true,
                        else : false
                    }
                }
            }
        },
        {
            $project : {
                username : 1,
                fullName : 1,
                email : 1,
                subscribers : 1,
                subscribedTo : 1,
                avatar : 1,
                coverImage : 1,
                subscribersCount : 1,
                subscriberedToChannelsCount : 1,
                isSubscribed : 1

            }
        }
    ])

    if(!channelDetails?.length)
    {
        throw new Error(404, "No Channel Found")
    }

    return res
    .status(200)
    .json(new ApiResponse(
        200,
        channel[0],
        "Channel Details Fetched Successfully"
    ))
        
})

const check = asyncHandlerPromises(async (req,res)=>{
    
    res.status(200).json({
        message : "checking successfull"
    })
})



export 
{ 
    register, 
    check, 
    loginUser, 
    logoutUser, 
    refreshingAccessAndRefreshTokens ,
    updatePassword,
    getUserDetails,
    changeUserDetails,
    updateAvatar, 
    updateCoverImage,
    getUserChannelProfile
};