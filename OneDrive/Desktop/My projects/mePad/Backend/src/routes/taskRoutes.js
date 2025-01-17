const express = require('express');
const {
    updateTask,
    deleteTask
} = require('../controllers/taskController');

const router = express.Router();

const { protect } = require('../middleware/authMiddleware');
const { restrictTo } = require('../middleware/roleMiddleware');

router
    .route('/:id')
    .put(protect, updateTask)
    .delete(protect, restrictTo('admin'), deleteTask);

module.exports = router; 