const mongoose = require('mongoose');

const PainPointSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a pain point title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please add a pain point description'],
        maxlength: [500, 'Description cannot be more than 500 characters']
    },
    severity: {
        type: String,
        enum: ['low', 'medium', 'high', 'critical'],
        default: 'medium'
    },
    status: {
        type: String,
        enum: ['identified', 'in-progress', 'resolved'],
        default: 'identified'
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    addedAt: {
        type: Date,
        default: Date.now
    }
});

const MeetingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
        type: String,
        maxlength: [500, 'Description cannot be more than 500 characters']
    },
    date: {
        type: Date,
        required: [true, 'Please add a meeting date']
    },
    duration: {
        type: Number,
        required: [true, 'Please add meeting duration in minutes']
    },
    status: {
        type: String,
        enum: ['scheduled', 'in-progress', 'completed', 'cancelled'],
        default: 'scheduled'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    painPoints: [PainPointSchema]
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Reverse populate with virtuals
MeetingSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'meetingId',
    justOne: false
});

module.exports = mongoose.model('Meeting', MeetingSchema); 