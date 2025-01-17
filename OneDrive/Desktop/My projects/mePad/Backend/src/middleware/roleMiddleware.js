const asyncHandler = require('../utils/asyncHandler');

exports.restrictTo = (...roles) => {
    return asyncHandler(async (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            res.status(403);
            throw new Error(`Role ${req.user.role} is not authorized to access this route`);
        }
        next();
    });
};

// Admin only middleware
exports.adminOnly = async (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Only admins can access this route'
        });
    }
    next();
}; 