const express = require("express");
const router = express.Router();
const leaveController = require("../controllers/leaveController");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

// Admin/HR
router.get("/leaves", auth, role(["admin", "hr"]), leaveController.getLeaves);
router.get(
  "/leaves/:id",
  auth,
  role(["admin", "hr"]),
  leaveController.getLeave
);
router.put(
  "/leaves/:id/status",
  auth,
  role(["admin", "hr"]),
  leaveController.updateLeaveStatus
);
router.delete(
  "/leaves/:id",
  auth,
  role(["admin", "hr"]),
  leaveController.deleteLeave
);

// Employee
router.post("/leaves", leaveController.createLeave);
router.put("/leaves/:id", leaveController.updateLeave);

module.exports = router;
