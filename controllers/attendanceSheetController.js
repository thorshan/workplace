const AttendanceSheet = require("../models/AttendanceSheet");
const Employee = require("../models/Employee");

// Get all attendance sheets
const getAllAttendanceSheets = async (req, res) => {
  try {
    const sheets = await AttendanceSheet.find()
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });
    res.status(200).json(sheets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new attendance sheet
const createAttendanceSheet = async (req, res) => {
  try {
    const { date, createdBy } = req.body;
    const exists = await AttendanceSheet.findOne({ date });
    if (exists) {
      return res
        .status(400)
        .json({ error: "Attendance sheet for this date already exists" });
    }
    const employees = await Employee.find().populate("department");
    const records = employees.map((emp) => ({
      employee: emp._id,
      department: emp.department,
      status: "Pending",
      remark: "",
    }));
    const sheet = new AttendanceSheet({
      date,
      createdBy,
      records,
    });
    await sheet.save();
    res.status(201).json(sheet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a specific attendance sheet by ID
const getAttendanceSheetById = async (req, res) => {
  try {
    const sheet = await AttendanceSheet.findById(req.params.id)
      .populate("createdBy", "name")
      .populate("records.employee", "name")
      .populate("records.department", "name");
    if (!sheet) {
      return res.status(404).json({ error: "Attendance sheet not found" });
    }
    res.status(200).json(sheet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an attendance sheet
const updateAttendanceSheet = async (req, res) => {
  try {
    const sheet = await AttendanceSheet.findById(req.params.id);
    if (!sheet) {
      return res.status(404).json({ error: "Attendance sheet not found" });
    }
    const record = sheet.records.id(req.params.recordId);
    if (!record) {
      return res.status(404).json({ error: "Record not found" });
    }
    record.status = req.body.status ?? record.status;
    record.remark = req.body.remark ?? record.remark;
    await sheet.save();
    res.status(200).json(sheet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete an attendance sheet
const deleteAttendanceSheet = async (req, res) => {
  try {
    const sheet = await AttendanceSheet.findByIdAndDelete(req.params.id);
    if (!sheet) {
      return res.status(404).json({ error: "Attendance sheet not found" });
    }
    res.status(200).json({ message: "Attendance sheet deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllAttendanceSheets,
  createAttendanceSheet,
  getAttendanceSheetById,
  updateAttendanceSheet,
  deleteAttendanceSheet,
};
