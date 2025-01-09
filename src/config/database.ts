import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
    try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetworkDB';
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully.');
    } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
    }
};

export default connectDB;
