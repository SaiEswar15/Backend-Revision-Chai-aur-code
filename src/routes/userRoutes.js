// Import necessary modules
import { Router } from "express";
import 
{ 
    check, 
    getUserDetails, 
    loginUser, 
    logoutUser, 
    refreshingAccessAndRefreshTokens, 
    register, 
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
export { userRouter };



// Example route to test file upload
// userRouter.post('/upload', upload.single('file'), (req, res) => {
//     res.json({ message: 'File uploaded successfully.' });
// });

// Export the user router

