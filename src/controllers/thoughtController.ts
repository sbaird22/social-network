import { Request, Response } from 'express';
import { Thought } from '../models/Thought';
import { User } from '../models/User';

// Get all thoughts
export const getAllThoughts = async (req: Request, res: Response): Promise<void> => {
    try {
    const thoughts = await Thought.find().populate('reactions');
    res.status(200).json(thoughts);
    } catch (err) {
    res.status(500).json(err);
    }
};

// Get a single thought by ID
export const getThoughtById = async (req: Request, res: Response): Promise<void> => {
    try {
    const thought = await Thought.findById(req.params.thoughtId).populate('reactions');
    if (!thought) {
        res.status(404).json({ message: 'Thought not found!' });
        return;
    }
    res.status(200).json(thought);
    } catch (err) {
    res.status(500).json(err);
    }
};

// Create a new thought
export const createThought = async (req: Request, res: Response): Promise<void> => {
    try {
    const thought = await Thought.create(req.body);

    // Push the new thought's ID to the associated user's thoughts array
    await User.findByIdAndUpdate(
        req.body.userId,
        { $push: { thoughts: thought._id } },
        { new: true }
    );

    res.status(201).json(thought);
    } catch (err) {
    res.status(500).json(err);
    }
};

// Update a thought by ID
export const updateThought = async (req: Request, res: Response): Promise<void> => {
    try {
    const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, {
        new: true,
        runValidators: true,
    });
    if (!thought) {
        res.status(404).json({ message: 'Thought not found!' });
        return;
    }
    res.status(200).json(thought);
    } catch (err) {
    res.status(500).json(err);
    }
};

// Delete a thought by ID
export const deleteThought = async (req: Request, res: Response): Promise<void> => {
    try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!thought) {
        res.status(404).json({ message: 'Thought not found!' });
        return;
    }

    // Remove the thought's ID from the associated user's thoughts array
    await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
    );

    res.status(200).json({ message: 'Thought deleted successfully!' });
    } catch (err) {
    res.status(500).json(err);
    }
};

// Add a reaction to a thought
export const addReaction = async (req: Request, res: Response): Promise<void> => {
    try {
    const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $addToSet: { reactions: req.body } },
        { new: true, runValidators: true }
    );
    if (!thought) {
        res.status(404).json({ message: 'Thought not found!' });
        return;
    }
    res.status(200).json(thought);
    } catch (err) {
    res.status(500).json(err);
    } 
};

// Remove a reaction from a thought
export const removeReaction = async (req: Request, res: Response): Promise<void> => {
    try {
    const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
    );
    if (!thought) {
        res.status(404).json({ message: 'Thought not found!' });
        return;
    }
    res.status(200).json(thought);
    } catch (err) {
    res.status(500).json(err);
    } 
};
