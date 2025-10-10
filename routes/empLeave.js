const express = require("express");
const router = express.Router();
const empLeaveController = require("../controllers/empLeaveController");

// Employee routes
router.post("/leaves/:id", empLeaveController.getEmployeeLeaves);
router.post("/leaves/create", empLeaveController.createEmployeeLeave);
router.delete("/leaves/:id", empLeaveController.cancelEmployeeLeave);

module.exports = router;
