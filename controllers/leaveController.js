const Leave = require("../models/Leave");
const Employee = require("../models/Employee"); // optional if needed

// Get all leaves (Admin/HR)
const getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate("employee", "name email");
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single leave
const getLeave = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id).populate(
      "employee",
      "name email"
    );
    if (!leave) return res.status(404).json({ message: "Leave not found" });
    res.json(leave);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create leave (Employee)
const createLeave = async (req, res) => {
  try {
    const leave = new Leave(req.body);
    await leave.save();
    res.status(201).json(leave);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update leave (Employee can cancel, Admin/HR can update)
const updateLeave = async (req, res) => {
  try {
    const leave = await Leave.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!leave) return res.status(404).json({ message: "Leave not found" });
    res.json(leave);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update leave status (Admin/HR only)
const updateLeaveStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!leave) return res.status(404).json({ message: "Leave not found" });
    res.json(leave);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete leave
const deleteLeave = async (req, res) => {
  try {
    const leave = await Leave.findByIdAndDelete(req.params.id);
    if (!leave) return res.status(404).json({ message: "Leave not found" });
    res.json({ message: "Leave deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getLeaves,
  getLeave,
  createLeave,
  updateLeave,
  updateLeaveStatus,
  deleteLeave,
};
