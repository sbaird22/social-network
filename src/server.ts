import express, { Application } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';

// Load environment variables
dotenv.config();

// Initialize the app
const app: Application = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Database connection
connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}).catch((error) => {
    console.error('Failed to connect to the database:', error);
});
