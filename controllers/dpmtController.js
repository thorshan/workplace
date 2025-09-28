const Department = require('../models/Department');

// Get all department
const getAllDepartments = async (req, res) => {
    try {
        const department = await Department.find();
        res.json(department);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Create department
const createDpmt = async (req, res) => {
    try {
        const { name, description } = req.body;
        const checkExisting = await Department.findOne({ name });
        if(checkExisting)
            res.status(400).json({ message: "Department already exist!" });
        const department = await Department.create({ name, description });
        res.json({ message: "Department created successfully.", department });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Get department by Id
const getDpmt = async (req, res) => {
    try {
        const department = await Department.findById(req.params.id);
        if(!department)
            res.status(400).json({ message: "No department found!" });
        res.json(department);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Update department
const updateDpmt = async (req, res) => {
    try {
        const { name, description, isActive } = req.body;
        const department = await Department.findById(req.params.id);
        if(!department)
            res.status(400).json({ message: "No department found!" });
        if(isActive)
            department.name = name;
        if(name)
            department.name = name;
        if(description)
            department.description = description;
        await department.save();
        res.json({ message: "Department updated successfully", department });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Delete department
const deleteDpmt = async (req, res) => {
    try {
        const department = await Department.findById(req.params.id);
        if(!department)
            res.status(400).json({ message: "No department found!" });
        await Department.findByIdAndDelete(req.params.id);
        res.json({ message: "Department deleted!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getAllDepartments,
    createDpmt,
    getDpmt,
    updateDpmt,
    deleteDpmt,
}