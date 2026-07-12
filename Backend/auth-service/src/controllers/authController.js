//to wite code to validate a user trying to signup and create a new user in the database
const User = require("../models/User");
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
        const { name, email, password, college, branch, year, collegeIdImageUrl } = req.body;
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
        const userExists = await User.findOne({ email: normalizedEmail });
        if (userExists) {
            return res.status(409).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ name, email: normalizedEmail, password: hashedPassword, college, branch, year, collegeIdImageUrl });

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
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        const normalizedEmail = email.toLowerCase().trim();
        const user = await User.findOne({ email: normalizedEmail });
       
       
        if (user && (await bcrypt.compare(password, user.password))) {
           
            const token = generateToken(user);
            return res.status(200).json({
                message: "User logged in successfully",
                token
            });
        } else {
            return res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
module.exports = {
    signup,
    loginUser
};