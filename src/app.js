

const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")

const app = express()

//cross origin resource //middleware
app.use(cors(     
    {
        origin : process.env.CORS_ORIGIN,
        credentials : true
    }
))  

//we may get different data from the request //forms //body //params //json

// app.use(express.json({ limit : "16kb" }))

// app.use(express.urlencoded( { extended : true, limit : "16kb" } ))

// app.use(express.static("./public"))

app.use(express.static('public'));

app.use(cookieParser());

const { router } = require("./routes/allRoutes.js");

app.use("/api/v1",router)

module.exports = {app}

