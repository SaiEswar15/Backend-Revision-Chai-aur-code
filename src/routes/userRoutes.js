// Import necessary modules
import { Router } from "express";
import { check, register } from "../controllers/users.controller.js";
import upload from "../middlewares/multer.middleware.js";


// Create a user router
const userRouter = Router();

// Use the upload middleware before the "/register" route
userRouter.post('/register', upload.single('avatar'), register);

// Define other routes
userRouter.route("/check").get(check);

// Example route to test file upload
userRouter.post('/upload', upload.single('file'), (req, res) => {
    res.json({ message: 'File uploaded successfully.' });
});

// Export the user router
export { userRouter };
