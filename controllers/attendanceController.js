const Attendance = require("../models/Attendance");

// GET all attendance records
const getAllAttendance = async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find()
      .populate("employee", "name") // show employee name & ID
      .populate("department", "name") // show department name
      .populate("createdBy", "name") // show who created
      .sort({ createdAt: -1 }); // latest first

    res.status(200).json(attendanceRecords);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// CREATE new attendance record
const createAttendance = async (req, res) => {
  try {
    const { employee, department, status, remark } = req.body;
    if (!employee || !department) {
      return res
        .status(400)
        .json({ message: "Employee and Department are required" });
    }

    const newAttendance = new Attendance({
      employee,
      department,
      status: status || "Pending",
      remark: remark || null,
      createdBy: req.user._id, // assuming you have user from auth middleware
    });

    const savedAttendance = await newAttendance.save();
    const populatedAttendance = await savedAttendance
      .populate("employee", "name")
      .populate("department", "name")
      .populate("createdBy", "name");

    res.status(201).json(populatedAttendance);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE attendance by ID
const deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    const attendance = await Attendance.findById(id);
    if (!attendance) {
      return res.status(404).json({ message: "Attendance record not found" });
    }

    await attendance.remove();

    res.status(200).json({ message: "Attendance record deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllAttendance,
  createAttendance,
  deleteAttendance,
};
