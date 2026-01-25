import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    googleId: string;
    email: string;
    name: string;
    picture?: string;
    role: 'user' | 'admin';
    subscription?: mongoose.Types.ObjectId;
    dailyUsage?: {
        date: Date;
        tailorCount: number;
        atsCount: number;
    };
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema(
    {
        googleId: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        picture: {
            type: String,
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        subscription: {
            type: Schema.Types.ObjectId,
            ref: 'Subscription',
        },
        dailyUsage: {
            date: {
                type: Date,
                default: Date.now
            },
            tailorCount: {
                type: Number,
                default: 0
            },
            atsCount: {
                type: Number,
                default: 0
            }
        },
    },
    {
        timestamps: true,
    }
);

// Indexes for better query performance

export const User = mongoose.model<IUser>('User', UserSchema);
