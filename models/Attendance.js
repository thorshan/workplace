const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Active", "Absent"],
      default: "Pending",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    remark: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attendance", attendanceSchema);
