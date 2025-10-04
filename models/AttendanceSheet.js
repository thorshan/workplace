const mongoose = require("mongoose");

const AttendanceSheetSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true,
  },
  records: [
    {
      employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
      },
      department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
      },
      status: {
        type: String,
        enum: ["Present", "Absent", "Pending"],
        default: "Pending",
      },
      remark: {
        type: String,
        default: "",
      },
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("AttendanceSheet", AttendanceSheetSchema);