require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const TokenBlacklist = require('../models/TokenBlacklist');

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer "))
        return res.status(401).json({ message: "No token provided, Authorization denied."});
    const token = authHeader.split(" ")[1];

    try {
        // Check expired token
        const blacklisted = await TokenBlacklist.findOne({token});
        if(blacklisted)
            return res.status(401).json({ message: "Token is invalidated"});
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attached user to request
        const user = await User.findById(decoded.id).select("-password");
        if(!user) 
            return res.status(401).json({ message: "User not found" });
        req.user = user; // req.user can be used in controllers
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
}


module.exports = auth;