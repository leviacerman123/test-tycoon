require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? process.env.FRONTEND_URL
        : '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// Database Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Connected');
    } catch (err) {
        console.error('❌ MongoDB Connection Error:', err.message);
        // Retry after 5 seconds
        setTimeout(connectDB, 5000);
    }
};

connectDB();

// Routes
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Telegram Tycoon API is running',
        db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});

// Start Server
const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

// Graceful Shutdown
const shutdown = () => {
    console.log('\n🛑 Shutting down server...');
    server.close(() => {
        mongoose.connection.close(false, () => {
            console.log('MongoDB connection closed.');
            process.exit(0);
        });
    });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
