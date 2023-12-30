
const {Router} = require("express")
const { check, register } = require("../controllers/users.controller.js");
const { upload } = require("../middlewares/multer.middleware.js")

const userRouter = Router(); 

userRouter.post("/register", upload.fields([
    {
        name : "avatar",
        maxCount : 1
    },
    {
        name : "coverImage",
        maxCount : 1
    }
]), register)

userRouter.route("/check").get(check)

module.exports = {userRouter};