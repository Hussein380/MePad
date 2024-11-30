import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { setCookies } from "../utils/cookies.js";  // This is a utility to set cookies, implement if needed

// Utility to generate JWT tokens
const generateTokens = (userId, role) => {
    const accessToken = jwt.sign({ userId, role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ userId, role }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
    return { accessToken, refreshToken };
};

// Signup function
export const signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const newUser = new User({
            name,
            email,
            password,
            role,  // Role can be either 'user' or 'chef'
        });

        await newUser.save();
        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login function
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && (await user.comparePassword(password))) {
            const { accessToken, refreshToken } = generateTokens(user._id, user.role);
            setCookies(res, accessToken, refreshToken);  // Set cookies

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            });
        } else {
            res.status(400).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get user profile
export const getProfile = async (req, res) => {
    try {
        res.json(req.user);  // Respond with the authenticated user data
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Refresh token (if you use refresh token functionality)
export const refreshToken = async (req, res) => {
    try {
        // Implement your refresh token logic
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

