// Import necessary modules
import { Router } from "express";
import 
{ 
    changeUserDetails,
    check, 
    getUserDetails, 
    loginUser, 
    logoutUser, 
    refreshingAccessAndRefreshTokens, 
    register, 
    updateAvatar, 
    updateCoverImage, 
    updatePassword

} from "../controllers/users.controller.js";
import upload from "../middlewares/multer.middleware.js";
import { verify } from "../middlewares/auth.middleware.js"


// Create a user router
const userRouter = Router();

// Define routes
userRouter.route("/check").get(check);

// Use the upload middleware before the "/register" route
userRouter.post('/register', upload.fields([
    {
        name: "avatar",
        maxCount: 1,   
    },
    {
        name: "coverImage",
        maxCount: 1,
    }
]), register);

userRouter.post("/login", loginUser)

userRouter.post("/refresh-accessToken", refreshingAccessAndRefreshTokens)

//secured routes
userRouter.post("/logout", verify, logoutUser)
userRouter.post("/change-password", verify, updatePassword)
userRouter.post("/fetch-user-data", verify, getUserDetails)
userRouter.post("/change-user-data", verify, changeUserDetails)
userRouter.post("/update-avatar", verify, upload.single("avatar"), updateAvatar)
userRouter.post("/update-cover-image", verify, upload.single("coverImage"), updateCoverImage)

export { userRouter };



// Example route to test file upload
// userRouter.post('/upload', upload.single('file'), (req, res) => {
//     res.json({ message: 'File uploaded successfully.' });
// });

// Export the user router

