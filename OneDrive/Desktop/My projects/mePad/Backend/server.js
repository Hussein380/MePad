const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./src/config/db');
const errorHandler = require('./src/middleware/errorHandler');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Basic middleware
app.use(cors());
app.use(express.json());

// Connect to database
connectDB();

// Routes
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/meetings', require('./src/routes/meetingRoutes'));
app.use('/api/tasks', require('./src/routes/taskRoutes'));
app.use('/api/dashboard', require('./src/routes/dashboardRoutes'));

// Error handling
app.use(errorHandler);

// Start server with error handling
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        const server = app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

        // Handle server errors
        server.on('error', (error) => {
            if (error.code === 'EADDRINUSE') {
                console.log(`Port ${PORT} is busy. Trying ${PORT + 1}...`);
                server.listen(PORT + 1);
            } else {
                console.error('Server error:', error);
            }
        });

        // Handle process termination
        process.on('SIGTERM', () => {
            console.log('Received SIGTERM. Shutting down gracefully...');
            server.close(() => {
                console.log('Server closed');
                process.exit(0);
            });
        });

    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer(); 