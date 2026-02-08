import mongoose, { Schema, Document } from 'mongoose';

export interface IResume extends Document {
    userId: mongoose.Types.ObjectId;
    title: string;
    template: string;
    data: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}

const ResumeSchema: Schema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
            default: 'Untitled Resume',
        },
        template: {
            type: String,
            required: true,
            default: 'modern',
        },
        data: {
            type: Schema.Types.Mixed,
            required: true,
            default: {},
        },
    },
    {
        timestamps: true,
    }
);

// Indexes
ResumeSchema.index({ userId: 1, createdAt: -1 });
ResumeSchema.index({ title: 'text' });
// Unique constraint: one resume per template per user
ResumeSchema.index({ userId: 1, template: 1 }, { unique: true });

export const Resume = mongoose.model<IResume>('Resume', ResumeSchema);
