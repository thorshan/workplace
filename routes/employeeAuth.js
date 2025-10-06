const express = require("express");
const router = express.Router();
const empAuthController = require("../controllers/emyplyeeAuthController");

// Auth Employee
router.post("/login", empAuthController.loginWithEmail);

// Verifi Token
router.post("/verify-token", empAuthController.verifyToken);

// Profile
router.post("/profile", empAuthController.empProfile);

// Logout
router.post("/logout", empAuthController.logoutEmployee);

// Employee Profile

module.exports = router;
