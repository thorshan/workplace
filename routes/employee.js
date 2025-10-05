const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const auth = require("../middleware/auth");
const role = require("../middleware/role");

// Get all employee
router.get('/employee', auth, role(["admin", "hr"]), employeeController.getAllEmployee);

// Create employee
router.post('/employee', auth, role(["admin", "hr"]), employeeController.createEmployee);

// Get employee
router.get('/employee/:id', auth, role(["admin", "hr"]), employeeController.getEmployee);

// Update employee
router.put('/employee/:id', auth, role(["admin", "hr"]), employeeController.updateEmployee);

// Delete employee
router.delete('/employee/:id', auth, role(["admin", "hr"]), employeeController.deleteEmployee);

module.exports = router;