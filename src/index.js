
const {connectDB} = require("./db/index.js");
const dotenv = require("dotenv");
const {app} = require("./app.js");

dotenv.config({path : "./env"})

connectDB()   //since connecting to db is a async function and returns a promise we can use .then.catch
.then(()=>{
    app.listen(process.env.PORT || 8081, ()=>{
        console.log(`SERVER is running on port ${process.env.PORT}`);
    })
}).catch((err)=>{
    console.log("MONGO_DB connection FAILED !!!!", err);
})
