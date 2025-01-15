import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from './models/User';
import { Thought } from './models/Thoughts';

dotenv.config();

// Sample Data
const sampleUsers = [
    {
    username: 'john_doe',
    email: 'john.doe@example.com',
    },
    {
    username: 'jane_doe',
    email: 'jane.doe@example.com',
    },
];

const sampleThoughts = [
    {
    thoughtText: 'This is John’s first thought!',
    username: 'john_doe',
    },
        {
    thoughtText: 'Jane is excited to share her thoughts!',
    username: 'jane_doe',
    },
];

const seedDatabase = async (): Promise<void> => {
    try {
    // Connect to MongoDB
        const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetworkDB';
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected for seeding.');

    // Clear existing data
        await User.deleteMany({});
        await Thought.deleteMany({});
        console.log('Existing data cleared.');

    // Insert Users
        const createdUsers = await User.insertMany(sampleUsers);
        console.log('Users seeded:', createdUsers);

    // Insert Thoughts
        const createdThoughts = await Thought.insertMany(sampleThoughts);
        console.log('Thoughts seeded:', createdThoughts);

    // Associate Thoughts with Users
    for (const thought of createdThoughts) {
        await User.findOneAndUpdate(
        { username: thought.username },
        { $push: { thoughts: thought._id } }
        );
    }
    console.log('Thoughts associated with users.');

    // Close connection
    mongoose.connection.close();
    console.log('Seeding completed and connection closed.');
    } catch (err) {
    console.error('Error seeding the database:', err);
    mongoose.connection.close();
    }
};

// Run the seed script
seedDatabase();
