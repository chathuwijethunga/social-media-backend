import express from 'express'; // Import the necessary modules
import { getAllUser, login, signup } from '../controllers/user-controller';

const router = express.Router(); // Create an instance of an Express router


// Define a GET/POST route for the root path ("/") that calls functions

router.get("/",getAllUser); //calls the getAllUser function
router.post("/signup",signup); //calls the signup function
router.post("/login", login); //calls the login function
export default router; // Export the router