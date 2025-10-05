const express = require('express');
const router = express.Router();
const attendanceSheetController = require('../controllers/attendanceSheetController');
const auth = require("../middleware/auth");
const role = require("../middleware/role");

// Route to get attendance sheets
router.get('/attendance-sheets', auth, role(["admin", "hr"]), attendanceSheetController.getAllAttendanceSheets);

// Route to create a new attendance sheet
router.post('/attendance-sheets', auth, role(["admin", "hr"]), attendanceSheetController.createAttendanceSheet);

// Route to get a specific attendance sheet by ID
router.get('/attendance-sheets/:id', auth, role(["admin", "hr"]), attendanceSheetController.getAttendanceSheetById);

// Route to update attendance sheet
router.put('/attendance-sheets/:id', auth, role(["admin", "hr"]), attendanceSheetController.updateAttendanceSheet);

// Route to delete an attendance sheet
router.delete('/attendance-sheets/:id', auth, role(["admin", "hr"]), attendanceSheetController.deleteAttendanceSheet);

module.exports = router;