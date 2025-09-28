const mongoose = require('mongoose')

const emplyeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    },
    employeeID: {
        type: String,
        required: true
    },
    employmentDate: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    idNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Employee", emplyeeSchema);