import { Router } from "express";
import { check, register } from "../controllers/users.controller.js";

const userRouter = Router();

userRouter.route("/register").post(register)
userRouter.route("/check").get(check)

export {userRouter};