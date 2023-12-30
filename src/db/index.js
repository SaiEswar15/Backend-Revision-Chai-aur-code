
// import { asyncHandlerPromises } from "../utils/asyncHandler.js";
const mongoose = require("mongoose");
const { DB_NAME } = require("../constants.js");

const connectDB = async ()=>{
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

module.exports = {connectDB}



