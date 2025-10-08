const express = require("express");
const router = express.Router();
const adminLeaveController = require("../controllers/adminLeaveController");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

// Admin/HR leave routes
router.get(
  "/leaves",
  auth,
  role(["admin", "hr"]),
  adminLeaveController.getAllLeaves
);
router.put(
  "/leaves/:id/status",
  auth,
  role(["admin", "hr"]),
  adminLeaveController.updateLeaveStatus
);
router.delete(
  "/leaves/:id",
  auth,
  role(["admin", "hr"]),
  adminLeaveController.deleteLeave
);

module.exports = router;
