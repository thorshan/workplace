const express = require("express");
const router = express.Router();
const empLeaveController = require("../controllers/EmployeeLeaveController");

// Employee routes
router.post("/leaves", empLeaveController.getEmployeeLeaves); // fetch own leaves
router.post("/leaves/create", empLeaveController.createEmployeeLeave);
router.delete("/leaves/:id", empLeaveController.cancelEmployeeLeave);

module.exports = router;
