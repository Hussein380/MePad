const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const Meeting = require('../models/Meeting');
const Task = require('../models/Task');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res) => {
    const { email, password, role } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Create user
    const user = await User.create({
        email,
        password,
        role
    });

    if (user) {
        res.status(201).json({
            success: true,
            data: {
                _id: user._id,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            }
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.matchPassword(password))) {
        // Get role-specific data
        let dashboardData;
        
        if (user.role === 'admin') {
            // Get admin-specific data
            dashboardData = await getAdminDashboardData(user._id);
        } else {
            // Get participant-specific data
            dashboardData = await getParticipantDashboardData(user._id);
        }

        res.json({
            success: true,
            data: {
                _id: user._id,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
                dashboardData
            }
        });
    } else {
        res.status(401);
        throw new Error('Invalid credentials');
    }
});

// Helper function to get admin dashboard data
const getAdminDashboardData = async (userId) => {
    const upcomingMeetings = await Meeting.find({
        date: { $gte: new Date() },
        createdBy: userId
    }).sort({ date: 1 }).limit(5);

    const recentPainPoints = await Meeting.aggregate([
        { $unwind: '$painPoints' },
        { $match: { 'painPoints.status': { $ne: 'resolved' } } },
        { $sort: { 'painPoints.addedAt': -1 } },
        { $limit: 5 }
    ]);

    return {
        upcomingMeetings,
        recentPainPoints,
        type: 'admin'
    };
};

// Helper function to get participant dashboard data
const getParticipantDashboardData = async (userId) => {
    const upcomingMeetings = await Meeting.find({
        date: { $gte: new Date() },
        participants: userId
    }).sort({ date: 1 }).limit(5);

    const assignedTasks = await Task.find({
        assignedTo: userId,
        status: { $ne: 'completed' }
    }).sort({ deadline: 1 });

    return {
        upcomingMeetings,
        assignedTasks,
        type: 'participant'
    };
};

// @desc    Delete user (Admin only)
// @route   DELETE /auth/users/:id
// @access  Private (Admin)
exports.deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // Don't allow deleting the last admin
    if (user.role === 'admin') {
        const adminCount = await User.countDocuments({ role: 'admin' });
        if (adminCount <= 1) {
            res.status(400);
            throw new Error('Cannot delete the last admin user');
        }
    }

    await user.deleteOne();

    res.status(200).json({
        success: true,
        data: {}
    });
}); 