const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

// Get all attendance
router.get('/attendance', auth, role(['admin', 'hr']), attendanceController.getAllAttendance);

// Create attendance
router.post('/attendance', auth, role(['admin', 'hr']), attendanceController.createAttendance);

// Get attendance by Id
router.get('/attendance/:id', auth, role(['admin', 'hr']), attendanceController.getAttendance);

// Update attendance 
// router.put('/attendance/:id', auth, role(['admin', 'hr']), attendanceController.updateAttendance);

// Delete attendance 
router.delete('/attendance/:id', auth, role(['admin', 'hr']), attendanceController.deleteAttendance);

module.exports = router;