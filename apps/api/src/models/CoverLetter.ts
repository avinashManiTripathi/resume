import mongoose, { Schema, Document } from 'mongoose';

export interface ICoverLetter extends Document {
    userId: mongoose.Types.ObjectId;
    title: string;
    templateId: string;
    data: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}

const CoverLetterSchema: Schema = new Schema(
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
            default: 'Untitled Cover Letter',
        },
        templateId: {
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
CoverLetterSchema.index({ userId: 1, createdAt: -1 });
CoverLetterSchema.index({ title: 'text' });

export const CoverLetter = mongoose.model<ICoverLetter>('CoverLetter', CoverLetterSchema);
