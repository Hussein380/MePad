const Meeting = require('../models/Meeting');
const asyncHandler = require('../utils/asyncHandler');
const Task = require('../models/Task');

// @desc    Create new meeting
// @route   POST /api/meetings
// @access  Private
exports.createMeeting = asyncHandler(async (req, res) => {
    // Add user to req.body
    req.body.createdBy = req.user.id;

    const meeting = await Meeting.create(req.body);

    res.status(201).json({
        success: true,
        data: meeting
    });
});

// @desc    Get all meetings
// @route   GET /api/meetings
// @access  Private
exports.getMeetings = asyncHandler(async (req, res) => {
    const meetings = await Meeting.find()
        .populate('participants', 'email')
        .populate('createdBy', 'email')
        .populate('tasks');

    res.status(200).json({
        success: true,
        count: meetings.length,
        data: meetings
    });
});

// @desc    Get single meeting
// @route   GET /api/meetings/:id
// @access  Private
exports.getMeeting = asyncHandler(async (req, res) => {
    const meeting = await Meeting.findById(req.params.id)
        .populate('participants', 'email')
        .populate('createdBy', 'email')
        .populate({
            path: 'tasks',
            populate: {
                path: 'assignedTo',
                select: 'email'
            }
        });

    if (!meeting) {
        res.status(404);
        throw new Error('Meeting not found');
    }

    res.status(200).json({
        success: true,
        data: meeting
    });
});

// @desc    Update meeting
// @route   PUT /api/meetings/:id
// @access  Private
exports.updateMeeting = asyncHandler(async (req, res) => {
    let meeting = await Meeting.findById(req.params.id);

    if (!meeting) {
        res.status(404);
        throw new Error('Meeting not found');
    }

    // Make sure user is meeting creator
    if (meeting.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
        res.status(401);
        throw new Error('Not authorized to update this meeting');
    }

    meeting = await Meeting.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: meeting
    });
});

// @desc    Add pain point to meeting
// @route   POST /api/meetings/:id/painpoints
// @access  Private (Admin only)
exports.addPainPoint = asyncHandler(async (req, res) => {
    const meeting = await Meeting.findById(req.params.id);

    if (!meeting) {
        res.status(404);
        throw new Error('Meeting not found');
    }

    // Check if user is admin
    if (req.user.role !== 'admin') {
        res.status(403);
        throw new Error('Only admins can add pain points');
    }

    const painPoint = {
        ...req.body,
        addedBy: req.user.id
    };

    meeting.painPoints.push(painPoint);
    await meeting.save();

    res.status(201).json({
        success: true,
        data: meeting.painPoints[meeting.painPoints.length - 1]
    });
});

// @desc    Update pain point
// @route   PUT /api/meetings/:id/painpoints/:painPointId
// @access  Private (Admin only)
exports.updatePainPoint = asyncHandler(async (req, res) => {
    const meeting = await Meeting.findById(req.params.id);

    if (!meeting) {
        res.status(404);
        throw new Error('Meeting not found');
    }

    // Check if user is admin
    if (req.user.role !== 'admin') {
        res.status(403);
        throw new Error('Only admins can update pain points');
    }

    const painPoint = meeting.painPoints.id(req.params.painPointId);

    if (!painPoint) {
        res.status(404);
        throw new Error('Pain point not found');
    }

    // Update pain point fields
    const allowedUpdates = ['title', 'description', 'severity', 'status'];
    allowedUpdates.forEach(update => {
        if (req.body[update]) {
            painPoint[update] = req.body[update];
        }
    });

    await meeting.save();

    res.status(200).json({
        success: true,
        data: painPoint
    });
});

// @desc    Delete pain point
// @route   DELETE /api/meetings/:id/painpoints/:painPointId
// @access  Private (Admin only)
exports.deletePainPoint = asyncHandler(async (req, res) => {
    const meeting = await Meeting.findById(req.params.id);

    if (!meeting) {
        res.status(404);
        throw new Error('Meeting not found');
    }

    // Check if user is admin
    if (req.user.role !== 'admin') {
        res.status(403);
        throw new Error('Only admins can delete pain points');
    }

    const painPoint = meeting.painPoints.id(req.params.painPointId);

    if (!painPoint) {
        res.status(404);
        throw new Error('Pain point not found');
    }

    painPoint.remove();
    await meeting.save();

    res.status(200).json({
        success: true,
        data: {}
    });
});

// @desc    Get all pain points for a meeting
// @route   GET /api/meetings/:id/painpoints
// @access  Private
exports.getPainPoints = asyncHandler(async (req, res) => {
    const meeting = await Meeting.findById(req.params.id)
        .populate('painPoints.addedBy', 'email');

    if (!meeting) {
        res.status(404);
        throw new Error('Meeting not found');
    }

    res.status(200).json({
        success: true,
        count: meeting.painPoints.length,
        data: meeting.painPoints
    });
});

// @desc    Delete meeting
// @route   DELETE /meetings/:id
// @access  Private (Admin only)
exports.deleteMeeting = asyncHandler(async (req, res) => {
    const meeting = await Meeting.findById(req.params.id);

    if (!meeting) {
        res.status(404);
        throw new Error('Meeting not found');
    }

    // Check if user is admin
    if (req.user.role !== 'admin') {
        res.status(403);
        throw new Error('Only admins can delete meetings');
    }

    // Delete associated tasks
    await Task.deleteMany({ meetingId: meeting._id });

    // Delete the meeting
    await meeting.deleteOne();

    res.status(200).json({
        success: true,
        data: {}
    });
}); 