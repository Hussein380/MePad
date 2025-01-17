const express = require('express');
const {
    createMeeting,
    getMeetings,
    getMeeting,
    updateMeeting,
    getPainPoints,
    addPainPoint,
    updatePainPoint,
    deletePainPoint,
    deleteMeeting
} = require('../controllers/meetingController');

const { getTasks, createTask } = require('../controllers/taskController');

const router = express.Router();

const { protect } = require('../middleware/authMiddleware');
const { restrictTo } = require('../middleware/roleMiddleware');

// Task routes
router.route('/:meetingId/tasks')
    .get(protect, getTasks)
    .post(protect, createTask);

// Meeting routes
router.route('/')
    .get(protect, getMeetings)
    .post(protect, restrictTo('admin'), createMeeting);

router.route('/:id')
    .get(protect, getMeeting)
    .put(protect, updateMeeting)
    .delete(protect, restrictTo('admin'), deleteMeeting);

// Pain points routes
router.route('/:id/painpoints')
    .get(protect, getPainPoints)
    .post(protect, restrictTo('admin'), addPainPoint);

module.exports = router; 