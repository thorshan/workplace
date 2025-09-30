require('dotenv').config();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const TokenBlacklist = require('../models/TokenBlacklist');

// JWT Configuration
const createToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            role: user.role,
        }, process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES || "1d"}
    );
}

// Get all users
const allUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.json({ error: err.message });
    }
}

// Register new user
const register = async (req, res) => {
    try {
        const { name, email, password, role} = req.body;
        const checkUser = await User.findOne({ email });
        if(checkUser)
            return res.status(400).json({ message: "User already exist with that email address!" });
        // Hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        // Inject token to user
        const token = createToken(user);

        res.status(200).json({
            message: "User registered successfully.",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }, token
        });

    } catch (err) {
        res.status(500).json({ message: "Registeration failed", error: err.message });
    }
}

// Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if(!user)
            return res.status(400).json({ message: "User not found" });

        // Check credentials
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)
            return res.status(400).json({ message: "Invalid credientials"});

        // Inject token to user
        const token = createToken(user);

        res.json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }, token
        });
    } catch (err) {
        res.status(500).json({ message: "Login failed", error: err.message });
    }
}

// Get user
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user)
            return res.status(400).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Update user
const updateUser = async (req, res) => {
    try {
        const {id} = req.params;
        const { name, email, password, role } = req.body;

        // Check the user
        const user = await User.findById(id);
        if(!user) 
            return res.status(404).json({ message: "User not found" });

        // Update the user
        if(name) user.name = name;
        if(email) user.email = email;
        if(password) user.password = await bcrypt.hash(password, 10);
        if(role) user.role = role;

        // Save user
        await user.save();
        res.json({
            message: "User updated successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Delete user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user)
            return res.status(400).json({ message: "User not found"});
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted successfully"});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Logout
const logout = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if(!token)
        return res.status(400).json({ message: "No token provided" });
    try {
        const decoded = jwt.decode(token);
        const expiresAt = new Date(decoded.exp * 1000);
        await TokenBlacklist.create({ token, expiresAt });
        res.json({ message: "Logout successfully, token invalidated"});
    } catch (err) {
        res.status(500).json({ message: "Logout failed", error: err.message });
    }
} 
 
module.exports = {
    allUsers,
    register,
    login,
    logout,
    getUser,
    updateUser,
    deleteUser,
}