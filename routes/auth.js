const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

router.get('/users', authController.allUsers);
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', auth, authController.logout);
router.get('/users/:id', auth, authController.getUser);
router.put('/users/:id', auth, authController.updateUser);
router.delete('/users/:id', authController.deleteUser);

module.exports = router;