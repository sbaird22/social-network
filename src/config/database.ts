import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('MongoDB connected...');
} catch (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
}
};

export default connectDB;
