import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

//cross origin resource //middleware
app.use(cors(     
    {
        origin : process.env.CORS_ORIGIN,
        credentials : true
    }
))  

//we may get different data from the request //forms //body //params //json

app.use(express.json({ limit : "16kb" }))

app.use(express.urlencoded( { extended : true, limit : "16kb" } ))

app.use(express.static("public"))

app.use(cookieParser());

export const app = express()

