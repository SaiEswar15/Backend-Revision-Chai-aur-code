import mongoose, {Schema} from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new Schema({

    username : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        index : true    //used for searching
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true
    },
    fullname : {
        type : String,
        required : true,
        trim : true,
        index : true
    },
    avatar : {
        type : String,  //gives a url use cloudinary
        required : true,
    },
    coverImage : {
        type : String,  //gives a url use cloudinary
    },
    watchHistory : [
        {
            type : Schema.Type.ObjectId,
            ref : "video"
        }
    ],
    password : {
        type : String,
        required : [true, "Password is required"]
    },
    refreshToken : {
        type : String,
    },
    
},
{
    timestamps : true
})

//refer step 20 to learn in detail
userSchema.pre("save", async function(next)
{
    if(!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password, 10)
    next();
})

//custom methods
userSchema.methods.isPasswordCorrect = async function(password)
{
    return await bcrypt.compare(password, this.password)
    //returns true or false
}

export const users = mongoose.model("User", userSchema)