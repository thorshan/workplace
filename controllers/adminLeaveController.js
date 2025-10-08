const Leave = require("../models/Leave");
const Employee = require("../models/Employee");

// Get all leaves (Admin/HR)
const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate("employee", "name email");
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update leave status
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
  getAllLeaves,
  updateLeaveStatus,
  deleteLeave,
};
