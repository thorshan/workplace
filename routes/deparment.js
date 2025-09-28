const express = require('express');
const router = express.Router();
const dpmtController = require('../controllers/dpmtController');

// Get all departments
router.get('/departments', dpmtController.getAllDepartments);

// Create new department
router.post('/departments', dpmtController.createDpmt);

// Get department by Id
router.get('/departments/:id', dpmtController.getDpmt);

// Update department
router.put('/departments/:id', dpmtController.updateDpmt);

// Delete department
router.delete('/departments/:id', dpmtController.deleteDpmt);

module.exports = router;