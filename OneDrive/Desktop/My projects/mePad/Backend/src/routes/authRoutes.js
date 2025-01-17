const express = require('express');
const router = express.Router();
const { register, login, deleteUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { restrictTo } = require('../middleware/roleMiddleware');

// Auth routes
router.post('/register', register);
router.post('/login', login);
router.delete('/users/:id', protect, restrictTo('admin'), deleteUser);

module.exports = router; 