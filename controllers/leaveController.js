const Leave = require("../models/Leave");
const Employee = require("../models/Employee");

// Create new leave request
const createLeave = async (req, res) => {
  try {
    const { employee, type, startDate, endDate, reason, createdBy } = req.body;

    if (new Date(startDate) > new Date(endDate)) {
      return res
        .status(400)
        .json({ message: "Start date cannot be after end date." });
    }

    // Check overlapping leaves for same employee
    const overlap = await Leave.findOne({
      employee,
      $or: [
        {
          startDate: { $lte: endDate },
          endDate: { $gte: startDate },
        },
      ],
    });

    if (overlap) {
      return res
        .status(400)
        .json({ message: "Leave dates overlap with existing leave." });
    }

    const leave = await Leave.create({
      employee,
      type,
      startDate,
      endDate,
      reason,
      status: "Pending",
      createdBy,
    });

    res
      .status(201)
      .json({ message: "Leave request submitted successfully.", leave });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to create leave.", error: error.message });
  }
};

// Get all leaves (admin)
const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate("employee", "employeeID name department")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(leaves);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch leaves.", error: error.message });
  }
};

// Get leave by ID
const getLeaveById = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id)
      .populate("employee", "employeeID name department")
      .populate("createdBy", "name email");

    if (!leave) return res.status(404).json({ message: "Leave not found." });

    res.status(200).json(leave);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching leave.", error: error.message });
  }
};

// Update leave (only if pending)
const updateLeave = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);
    if (!leave) return res.status(404).json({ message: "Leave not found." });

    if (leave.status !== "Pending") {
      return res
        .status(400)
        .json({ message: "Only pending leaves can be updated." });
    }

    const updated = await Leave.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res
      .status(200)
      .json({ message: "Leave updated successfully.", leave: updated });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update leave.", error: error.message });
  }
};

// Approve / Reject leave
const updateLeaveStatus = async (req, res) => {
  try {
    const { status } = req.body; // "Approved" or "Rejected"
    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status." });
    }

    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("employee", "employeeID name department");

    if (!leave) return res.status(404).json({ message: "Leave not found." });

    res
      .status(200)
      .json({ message: `Leave ${status.toLowerCase()} successfully.`, leave });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update status.", error: error.message });
  }
};

// Delete leave
const deleteLeave = async (req, res) => {
  try {
    const leave = await Leave.findByIdAndDelete(req.params.id);
    if (!leave) return res.status(404).json({ message: "Leave not found." });

    res.status(200).json({ message: "Leave deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete leave.", error: error.message });
  }
};

module.exports = {
  getAllLeaves,
  createLeave,
  getLeaveById,
  updateLeave,
  updateLeaveStatus,
  deleteLeave,
};
