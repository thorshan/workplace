const Employee = require('../models/Employee');

// Get all employees
const getAllEmployee = async (req, res) => {
    try {
        const employee = await Employee.find();
        res.json(employee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Create new employee
const createEmployee = async (req, res) => {
    try {
        const {
            name,
            email,
            phNumber,
            employeeID,
            employmentDate,
            department,
            dateOfBirth,
            idNumber,
            address,
        } = req.body;
        const checkExisting = await Employee.findOne({ email });
        if(checkExisting)
            res.status(400).json({ message: "Employee already exist." });
        const employee = await Employee.create({ name, email,phNumber, employeeID, employmentDate, department, dateOfBirth, idNumber, address });
        res.json({ message: "Employee created successfully.", employee });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Get employee by id
const getEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if(!employee)
            res.status(400).json({ message: "Employee not found." }); 
        res.json(employee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Update employee
const updateEmployee = async (req, res) => {
    try {
        const {
            name,
            email,
            phNumber,
            employeeID,
            employmentDate,
            department,
            dateOfBirth,
            idNumber,
            address,
            isActive
        } = req.body;
        const employee = await Employee.findById(req.params.id);
        if(!employee)
            res.status(400).json({ message: "Employee not found." });
        if(isActive) employee.isActive = isActive;
        if(name) employee.name = name;
        if(email) employee.email = email;
        if(phNumber) employee.phNumber = phNumber;
        if(employeeID) employee.employeeID = employeeID;
        if(employmentDate) employee.employmentDate = employmentDate;
        if(department) employee.department = department;
        if(dateOfBirth) employee.dateOfBirth = dateOfBirth;
        if(idNumber) employee.idNumber = idNumber;
        if(address) employee.address = address;
        await employee.save();
        res.json({ message: "Employee updated successfully", employee });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Delete employee
const deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if(!employee)
            res.json({ message: "Employee deleted." })
        await Employee.findByIdAndDelete(req.params.id);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getAllEmployee,
    createEmployee,
    getEmployee,
    updateEmployee,
    deleteEmployee
}