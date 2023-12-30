
const {Router} = require("express")
const {userRouter} = require("./userRoutes.js")

const router = Router();

router.use("/users", userRouter);


module.exports = {router};