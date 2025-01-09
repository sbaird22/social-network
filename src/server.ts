import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';
import routes from './routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Mount API routes at /api
app.use('/api', routes);

// Test route to verify server
app.get('/', (_req, res) => {
    res.send('API is running...');
});

// Connect to the database and start the server
connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
});
