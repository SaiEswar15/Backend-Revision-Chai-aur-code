import { Router } from "express";
import { check, register } from "../controllers/users.controller.js";
import upload from "../middlewares/multer.middleware.js";

const userRouter = Router();

userRouter.route("/register").post( upload.fields(
    [
        {
            name : "avatar", //name of the feild for communication
            maxCount : 1,
        },
        {
            name : "coverImage",
            maxCount : 1
        }
    ]
) , register)
userRouter.route("/check").get(check)

export {userRouter};