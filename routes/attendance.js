const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendanceController");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

// Get all attendance
router.get(
  "/attendance",
  auth,
  role(["admin", "hr"]),
  attendanceController.getAllAttendance
);

// Create attendance
router.post(
  "/attendance",
  auth,
  role(["admin", "hr"]),
  attendanceController.createAttendance
);

// Delete attendance
router.delete(
  "/attendance/:id",
  auth,
  role(["admin", "hr"]),
  attendanceController.deleteAttendance
);

module.exports = router;
