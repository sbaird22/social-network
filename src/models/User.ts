import { Schema, model, Document, Types } from 'mongoose';

// Interface for TypeScript type checking
export interface IUser extends Document {
    username: string;
    email: string;
    thoughts: Types.ObjectId[];
    friends: Types.ObjectId[];
    friendCount: number;
}

// User Schema definition
const userSchema = new Schema<IUser>(
{
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^.+@.+\..+$/, 'Please provide a valid email address.'],
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
},
{
    toJSON: {
            virtuals: true,
        },
            id: false,
}
);

// Virtual for friend count
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

export const User = model<IUser>('User', userSchema);
