const express = require('express');
const router = express.Router();
const dpmtController = require('../controllers/dpmtController');
const auth = require("../middleware/auth");
const role = require("../middleware/role");

// Get all departments
router.get('/departments', auth, role(["admin"]), dpmtController.getAllDepartments);

// Create new department
router.post('/departments', auth, role(["admin"]), dpmtController.createDpmt);

// Get department by Id
router.get('/departments/:id', auth, role(["admin"]), dpmtController.getDpmt);

// Update department
router.put('/departments/:id', auth, role(["admin"]), dpmtController.updateDpmt);

// Delete department
router.delete('/departments/:id', auth, role(["admin"]), dpmtController.deleteDpmt);

module.exports = router;