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
    const normalizedDate = new Date(req.body.date);
    normalizedDate.setHours(0, 0, 0, 0);

    // Use logged-in user from JWT
    const createdBy = req.user._id;

    // check duplicate
    const exists = await AttendanceSheet.findOne({ date: normalizedDate });
    if (exists) {
      return res.status(400).json({
        error: "Attendance sheet for this date already exists",
      });
    }

    // load employees with department
    const employees = await Employee.find().populate("department");

    // create records
    const records = employees.map((emp) => ({
      employee: emp._id,
      department: emp.department,
      status: "Pending",
      remark: "",
    }));

    const sheet = new AttendanceSheet({
      date: normalizedDate,
      createdBy,
      records,
    });

    await sheet.save();

    await sheet.populate([
      { path: "createdBy", select: "name" },
      { path: "records.employee", select: "name" },
      { path: "records.department", select: "name" },
    ]);

    res.status(201).json(sheet);
  } catch (err) {
    console.error("Error creating sheet:", err);
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
    const { records } = req.body;

    if (!Array.isArray(records)) {
      return res.status(400).json({ error: "Invalid records payload (expected array)" });
    }

    const sheet = await AttendanceSheet.findById(req.params.id);
    if (!sheet) {
      return res.status(404).json({ error: "Attendance sheet not found" });
    }

    // Update each incoming record (match by _id)
    records.forEach((updatedRecord) => {
      if (!updatedRecord._id) return; // skip invalid entries
      const record = sheet.records.id(updatedRecord._id);
      if (record) {
        if (typeof updatedRecord.status !== "undefined") {
          record.status = updatedRecord.status;
        }
        if (typeof updatedRecord.remark !== "undefined") {
          record.remark = updatedRecord.remark;
        }
      }
    });

    await sheet.save();

    // Return fresh populated sheet
    const updatedSheet = await AttendanceSheet.findById(req.params.id)
      .populate("createdBy", "name")
      .populate("records.employee", "name")
      .populate("records.department", "name");

    res.status(200).json(updatedSheet);
  } catch (err) {
    console.error("Error updating attendance sheet:", err);
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
