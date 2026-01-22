import mongoose, { Schema, Document } from 'mongoose';

export enum FeatureName {
    ATS_CHECK = 'ats-check',
    TAILOR = 'tailor',
    PDF_EXPORT = 'pdf-export',
    COVER_LETTER = 'cover-letter',
    MOCK_INTERVIEW = 'mock-interview',
}

export interface IFeatureConfig extends Document {
    name: string;
    description: string;
    isPremium: boolean;
    updatedBy?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const FeatureConfigSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            enum: Object.values(FeatureName),
        },
        description: {
            type: String,
            required: true,
        },
        isPremium: {
            type: Boolean,
            default: true,
            required: true,
        },
        updatedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
);

export const FeatureConfig = mongoose.model<IFeatureConfig>('FeatureConfig', FeatureConfigSchema);
