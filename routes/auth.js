const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

router.get('/users', auth, role(['admin']), authController.allUsers);
router.post('/users/register', auth, role(['admin']), authController.register);
router.post('/login', authController.login);
router.post('/logout', auth, authController.logout);
router.get('/users/:id', auth, role(['admin']), authController.getUser);
router.put('/users/:id', auth, role(['admin']), authController.updateUser);
router.delete('/users/:id', auth, role(['admin']), authController.deleteUser);

module.exports = router;