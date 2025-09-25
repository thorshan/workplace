const mongoose = require('mongoose');
const TokenBlacklistSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
});

// Auto delete expired token
TokenBlacklistSchema.index({ expiresAt: 1}, { expireAfterSeconds: 0});

module.exports = mongoose.model("TokenBlacklist", TokenBlacklistSchema);