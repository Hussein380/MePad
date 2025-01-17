const Meeting = require('../models/Meeting');
const Task = require('../models/Task');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Get admin dashboard data
// @route   GET /api/dashboard/admin
// @access  Private (Admin only)
exports.getAdminDashboard = asyncHandler(async (req, res) => {
    // Get all meetings with pain points and tasks
    const meetings = await Meeting.find()
        .populate('participants', 'email')
        .populate('painPoints')
        .populate('tasks');

    // Get statistics
    const stats = {
        totalMeetings: meetings.length,
        upcomingMeetings: meetings.filter(m => m.status === 'scheduled').length,
        totalPainPoints: meetings.reduce((acc, m) => acc + m.painPoints.length, 0),
        totalTasks: meetings.reduce((acc, m) => acc + m.tasks.length, 0)
    };

    res.status(200).json({
        success: true,
        data: {
            stats,
            meetings
        }
    });
});

// @desc    Get participant dashboard data
// @route   GET /api/dashboard/participant
// @access  Private
exports.getParticipantDashboard = asyncHandler(async (req, res) => {
    // Get meetings where user is a participant
    const meetings = await Meeting.find({
        $or: [
            { participants: req.user.id },
            { createdBy: req.user.id }
        ]
    }).populate('tasks');

    // Get tasks assigned to user
    const tasks = await Task.find({ assignedTo: req.user.id })
        .populate('meetingId', 'title date');

    // Get user-specific statistics
    const stats = {
        upcomingMeetings: meetings.filter(m => m.status === 'scheduled').length,
        completedMeetings: meetings.filter(m => m.status === 'completed').length,
        pendingTasks: tasks.filter(t => t.status === 'pending').length,
        completedTasks: tasks.filter(t => t.status === 'completed').length
    };

    res.status(200).json({
        success: true,
        data: {
            stats,
            meetings,
            tasks
        }
    });
}); 