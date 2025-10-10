const Leave = require("../models/Leave");
const Employee = require("../models/Employee");

// Get leaves for the logged-in employee
const getEmployeeLeaves = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    const leaves = await Leave.find({ employee: employee._id });
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new leave
const createEmployeeLeave = async (req, res) => {
  try {
    const leave = new Leave({
      ...req.body,
      status: "Pending", // employee always starts with pending
    });
    await leave.save();
    res.status(201).json(leave);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Cancel leave (employee)
const cancelEmployeeLeave = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);
    if (!leave) return res.status(404).json({ message: "Leave not found" });
    if (leave.status !== "Pending")
      return res
        .status(400)
        .json({ message: "Only pending leaves can be canceled" });

    await leave.remove();
    res.json({ message: "Leave canceled" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getEmployeeLeaves,
  createEmployeeLeave,
  cancelEmployeeLeave,
};
