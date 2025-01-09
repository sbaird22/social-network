import { Request, Response } from 'express';
import { User } from '../models/User';
import { Thought } from '../models/Thoughts';

// Get all users
export const getAllUsers = async (_: Request, res: Response): Promise<void> => {
try {
    const users = await User.find().populate('thoughts').populate('friends');
    res.status(200).json(users);
} catch (err) {
    res.status(500).json(err);
}
};

// Get a single user by ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.params.userId).populate('thoughts').populate('friends');
    if (!user) {
        res.status(404).json({ message: 'User not found!' });
        return;
    }
        res.status(200).json(user);
 } catch (err) {
        res.status(500).json(err);
}
};

// Create a new user
export const createUser = async (req: Request, res: Response): Promise<void> => {
try {
    const user = await User.create(req.body);
    res.status(201).json(user);
} catch (err) {
    res.status(500).json(err);
}
};

// Update a user by ID
export const updateUser = async (req: Request, res: Response): Promise<void> => {
try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true, runValidators: true });
    if (!user) {
        res.status(404).json({ message: 'User not found!' });
        return;
    }
    res.status(200).json(user);
} catch (err) {
    res.status(500).json(err);
}
};

// Delete a user by ID
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
        res.status(404).json({ message: 'User not found!' });
        return;
    }

    // Delete all thoughts associated with the user
    await Thought.deleteMany({ _id: { $in: user.thoughts } });
    res.status(200).json({ message: 'User and associated thoughts deleted!' });
} catch (err) {
    res.status(500).json(err);
}
};

// Add a friend to a user's friend list
export const addFriend = async (req: Request, res: Response): Promise<void> => {
    try {
    const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
    );
    if (!user) {
        res.status(404).json({ message: 'User not found!' });
        return;
    }
    res.status(200).json(user);
} catch (err) {
    res.status(500).json(err);
}
};

// Remove a friend from a user's friend list
export const removeFriend = async (req: Request, res: Response): Promise<void> => {
    try {
    const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { friends: req.params.friendId } },
        { new: true }
    );
    if (!user) {
        res.status(404).json({ message: 'User not found!' });
        return;
    }
    res.status(200).json(user);
} catch (err) {
    res.status(500).json(err);
}
};
