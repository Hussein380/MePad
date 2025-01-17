const express = require('express');
const {
    getAdminDashboard,
    getParticipantDashboard
} = require('../controllers/dashboardController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/admin', protect, adminOnly, getAdminDashboard);
router.get('/participant', protect, getParticipantDashboard);

router.get('/admin/onboarding', protect, adminOnly, (req, res) => {
    res.json({
        success: true,
        data: {
            welcomeMessage: "Welcome to Meeting Management System",
            quickActions: [
                {
                    title: "Create Meeting",
                    endpoint: "/api/meetings",
                    method: "POST"
                },
                {
                    title: "Assign Tasks",
                    endpoint: "/api/meetings/:meetingId/tasks",
                    method: "POST"
                },
                {
                    title: "Add Pain Points",
                    endpoint: "/api/meetings/:meetingId/painpoints",
                    method: "POST"
                }
            ],
            stats: {
                totalMeetings: 0,
                pendingTasks: 0
            }
        }
    });
});

router.get('/participant/onboarding', protect, (req, res) => {
    res.json({
        success: true,
        data: {
            welcomeMessage: "Welcome to Your Meeting Dashboard",
            upcomingMeetings: [],
            pendingTasks: [],
            actions: [
                {
                    title: "View Meetings",
                    endpoint: "/api/meetings",
                    method: "GET"
                },
                {
                    title: "Update Task Status",
                    endpoint: "/api/tasks/:taskId",
                    method: "PUT"
                }
            ]
        }
    });
});

module.exports = router; 