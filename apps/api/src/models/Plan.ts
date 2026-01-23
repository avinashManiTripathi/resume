import mongoose, { Schema, Document } from 'mongoose';

export interface IPlan extends Document {
    planId: string; // e.g., 'pro', 'premium'
    name: string;
    description: string;
    monthlyPrice: number;
    annualPrice: number;
    currency: string;
    features: string[];
    popular: boolean;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const PlanSchema: Schema = new Schema(
    {
        planId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        monthlyPrice: {
            type: Number,
            required: true,
            min: 0,
        },
        annualPrice: {
            type: Number,
            required: true,
            min: 0,
        },
        currency: {
            type: String,
            default: 'INR',
            required: true,
        },
        features: {
            type: [String],
            default: [],
        },
        popular: {
            type: Boolean,
            default: false,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

// Index for quick lookup
PlanSchema.index({ planId: 1 });
PlanSchema.index({ isActive: 1 });

export const Plan = mongoose.model<IPlan>('Plan', PlanSchema);
