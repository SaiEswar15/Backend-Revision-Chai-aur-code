
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import { asyncHandlerPromises } from "../utils/asyncHandler.js";

export const connectDB = async ()=>{
    try
    {
        
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}` )
        console.log("MONGO_DB connection SUCCESSFUL....", `DB HOST : ${connectionInstance.connection.host}`)
    }
    catch(error)
    {
        console.log("ERROR : MONGO_DB connection FAILED...", error)
        process.exit(1); //study about this 
    }
}



