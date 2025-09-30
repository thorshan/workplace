const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    employee: {
        type: [ mongoose.Schema.Types.ObjectId ],
        ref: 'Employee',
    },
    department: {
        type: [ mongoose.Schema.Types.ObjectId ],
        ref: 'Department'
    },
    status: {
        type: String,
        enum: [ 'Pending', 'Approved' ],
        default: 'Pending'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    remark: {
        type: String,
        nullable: true
    }
});

module.exports = mongoose.model("Attendance", attendanceSchema);