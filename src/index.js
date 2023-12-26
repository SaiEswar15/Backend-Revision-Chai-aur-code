// require("dotenv").config({path : "./env"})

import { connectDB } from "./db/index.js";
import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config({path : "./env"})

connectDB()   //since connecting to db is a async function and returns a promise we can use .then.catch
.then(()=>{
    app.listen(process.env.PORT || 8081, ()=>{
        console.log(`SERVER is running on port ${process.env.PORT}`);
    })
}).catch((err)=>{
    console.log("MONGO_DB connection FAILED !!!!", err);
})
