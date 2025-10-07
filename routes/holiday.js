const express = require("express");
const router = express.Router();
const holidayController = require("../controllers/holidayController");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

router.get(
  "/holidays",
  auth,
  role(["admin", "hr"]),
  holidayController.getAllHolidays
);
router.post(
  "/holidays",
  auth,
  role(["admin", "hr"]),
  holidayController.createHoliday
);
router.get(
  "/holidays/:id",
  auth,
  role(["admin", "hr"]),
  holidayController.getHolidayById
);
router.put(
  "/holidays/:id",
  auth,
  role(["admin", "hr"]),
  holidayController.updateHoliday
);
router.delete(
  "/holidays/:id",
  auth,
  role(["admin", "hr"]),
  holidayController.deleteHoliday
);

module.exports = router;
