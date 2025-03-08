import User from "../model/user";
import bcrypt from 'bcryptjs';

export const getAllUser = async(req, res, next) => {
    let users;
    try{
        // Attempt to fetch all users from the database
        users = await User.find();
    }catch(err){
        console.log(err);
    }
    // Check if any users were found
    if(!users){
        return res
        .status(404)        // If no users were found, return a response with a 404 status code
        .json({message: "no users found"})
    }
    return res.status(200).json({users});    // If users were found, return a response with a 200 status code
};



// Define an asynchronous function for user registration (sign-up)
export const signup = async (req, res, next) => {
    const{name, email, password} = req.body;  // Destructure user data from the request body

    let existingUser;
    try{
        // Attempt to find an existing user by their email address in the database
        existingUser = await User.findOne({email});
    }catch(err){
        return console.log(err);
    }
    // Check if an existing user with the same email address was found
    if (existingUser){
        return res
        .status(400)   // If an existing user is found, return a response with a 400 status code
        .json({message:"User Already Exists! Login instead"})
    }
    // Hash the user's password for security before storing it in the database
    const hashedPassword = bcrypt.hashSync(password);
    // Create a new User object with the provided user data, including the hashed password
    const user = new User({
        name,
        email,
        password: hashedPassword,
    });
    
    try{
        // Attempt to save the new user object to the database
        await user.save();
    }catch(err){
        // Handle any errors that occur during the database save operation
        return console.log(err);
    }
    // If the user registration is successful, return a response with a 201 status code
    return res.status(201).json({user});
};





export const login = async (req, res, next) => {
    const{email, password} = req.body;

    let existingUser;
    try{
        existingUser = await User.findOne({email});
    } catch(err){
        return console.log(err);
    }
    if (!existingUser){
        return res
            .status(404)
            .json({message:"couldn't find the user by this email"})
    }
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

    if (!isPasswordCorrect){
        return res.status(400).json({message:"incorrect password"});
    }
    return res.status(200).json({message:"login successful"});
    
};


