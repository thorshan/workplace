const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');


// Get all employee
router.get('/employee', employeeController.getAllEmployee);

// Create employee
router.post('/employee', employeeController.createEmployee);

// Get employee
router.get('/employee/:id', employeeController.getEmployee);

// Update employee
router.put('/employee/:id', employeeController.updateEmployee);

// Delete employee
router.delete('/employee/:id', employeeController.deleteEmployee);

module.exports = router;