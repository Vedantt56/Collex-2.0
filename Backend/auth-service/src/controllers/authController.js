//to wite code to validate a user trying to signup and create a new user in the database
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "30d"
        }
    );
}

const signup = async (req, res) => {
    try {
        const { name, email, password, college, branch, year, collegeIdImageUrl, username } = req.body;
        if (
            !name ||
            !email ||
            !password ||
            !college ||
            !branch ||
            !year ||
            !collegeIdImageUrl
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }
        const normalizedEmail = email.toLowerCase().trim();
        const normalizedUsername = username ? username.toLowerCase().trim() : normalizedEmail;
        const userExists = await User.findOne({ $or: [{ email: normalizedEmail }, { username: normalizedUsername }] });
        if (userExists) {
            return res.status(409).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ name, username: normalizedUsername, email: normalizedEmail, password: hashedPassword, college, branch, year, collegeIdImageUrl });

        if (user) {
            return res.status(201).json({
                message: "User created successfully",
            });
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const loginIdentifier = req.body.username || req.body.email;
        const password = req.body.password;
        if (!loginIdentifier || !password) {
            return res.status(400).json({ message: "Username/email and password are required" });
        }
        const normalizedIdentifier = loginIdentifier.toLowerCase().trim();
        const user = await User.findOne({ $or: [{ email: normalizedIdentifier }, { username: normalizedIdentifier }] });
       
       
        if (user && (await bcrypt.compare(password, user.password))) {
           
            const token = generateToken(user);
            return res.status(200).json({
                message: "User logged in successfully",
                token
            });
        } else {
            return res.status(401).json({ message: "Invalid username/email or password" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
const getMe = async (req, res) => {
    console.log(req.user);
    return res.status(200).json({
        message: "User fetched successfully",
        user: req.user
        
    });
};
const logout = async (req, res) => {
    return res.status(200).json({
        message: "User logged out successfully"
    });
};
module.exports = {
    signup,
    loginUser,
    getMe,
    logout
};