const express = require("express");
const router = express.Router();
const leaveController = require("../controllers/leaveController");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

router.get("/leaves", leaveController.getAllLeaves);

router.post("/leaves", leaveController.createLeave);

router.get("/leaves/:id", leaveController.getLeaveById);

router.put(
  "/leaves/:id",
  auth,
  role(["admin", "hr"]),
  leaveController.updateLeave
);

router.delete("/leaves/:id", leaveController.deleteLeave);

module.exports = router;
