import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    googleId: string;
    email: string;
    name: string;
    picture?: string;
    subscription?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema(
    {
        googleId: {
            type: String,
            required: true,
            unique: true,
            index: true,
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
        subscription: {
            type: Schema.Types.ObjectId,
            ref: 'Subscription',
        },
    },
    {
        timestamps: true,
    }
);

// Indexes for better query performance
UserSchema.index({ email: 1 });
UserSchema.index({ googleId: 1 });

export const User = mongoose.model<IUser>('User', UserSchema);
