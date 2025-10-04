const express = require('express');
const router = express.Router();
const attendanceSheetController = require('../controllers/attendanceSheetController');

// Route to get attendance sheets
router.get('/attendance-sheets', attendanceSheetController.getAllAttendanceSheets);

// Route to create a new attendance sheet
router.post('/attendance-sheets', attendanceSheetController.createAttendanceSheet);

// Route to get a specific attendance sheet by ID
router.get('/attendance-sheets/:id', attendanceSheetController.getAttendanceSheetById);

// Route to update attendance sheet
router.put('/attendance-sheets/:id', attendanceSheetController.updateAttendanceSheet);

// Route to delete an attendance sheet
router.delete('/attendance-sheets/:id', attendanceSheetController.deleteAttendanceSheet);

module.exports = router;