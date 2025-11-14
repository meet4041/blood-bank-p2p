import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// --- Import your new routes ---
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import requestRoutes from './routes/requestRoutes.js';
// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(express.json());

// A simple test route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// --- Use the auth routes ---
// Any request to /api/auth will be handled by authRoutes
app.use('/api/auth', authRoutes);

// --- Use the user routes ---
// Any request to /api/users will be handled by userRoutes
app.use('/api/users', userRoutes);

// --- Use the request routes ---
// Any request to /api/requests will be handled by requestRoutes
app.use('/api/requests', requestRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});