const Attendance = require('../models/Attendance');
const Employee = require('../models/Employee');
const Department = require('../models/Department');

// Get all attendance
const getAllAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.find();
        res.json(attendance);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

//Create attendance
const createAttendance = async (req, res) => {
    try {
        const employee = await Employee.find();
        const department = await Department.find();
        const attendance = await Attendance.create({ department, employee });
        res.json({ message: "Attendance created successfully.", attendance});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Get attendance by Id
const getAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.findById(req.params.id);
        if(!attendance)
            res.status(400).json({ message: "Attendace not found" });
        res.json(attendance);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Update attendance
// const updateAttendance = async (req, res) => {
//     try {
        
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// }

// Delete attendance
const deleteAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.findById(req.params.id);
        if(!attendance)
            res.status(400).json({ message: "Attendace not found" });
        await Attendance.findByIdAndDelete(req.params.id);
        res.json({ message: "Attendance deleted!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getAllAttendance,
    createAttendance,
    getAttendance,
    // updateAttendance,
    deleteAttendance
}