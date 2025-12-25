import mongoose, { Schema, Document } from 'mongoose';

export enum TemplateType {
    MODERN = 'modern',
    CLASSIC = 'classic',
    PROFESSIONAL = 'professional',
    CREATIVE = 'creative',
    MINIMAL = 'minimal',
    ATS_FRIENDLY = 'ats-friendly',
}

export enum TemplateCategory {
    GENERAL = 'general',
    TECH = 'tech',
    BUSINESS = 'business',
    CREATIVE = 'creative',
    ACADEMIC = 'academic',
    EXECUTIVE = 'executive',
}

export interface ITemplate extends Document {
    name: string;
    type: TemplateType;
    category: TemplateCategory;
    description?: string;
    htmlContent: string;
    cssContent?: string;
    thumbnail?: string;
    isPremium: boolean;
    isActive: boolean;
    sortOrder: number;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

const TemplateSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        type: {
            type: String,
            enum: Object.values(TemplateType),
            required: true,
            default: TemplateType.MODERN,
        },
        category: {
            type: String,
            enum: Object.values(TemplateCategory),
            required: true,
            default: TemplateCategory.GENERAL,
        },
        description: {
            type: String,
            trim: true,
        },
        htmlContent: {
            type: String,
            required: true,
        },
        cssContent: {
            type: String,
            default: '',
        },
        thumbnail: {
            type: String,
            trim: true,
        },
        isPremium: {
            type: Boolean,
            default: false,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        sortOrder: {
            type: Number,
            default: 0,
        },
        tags: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

// Indexes for better query performance
TemplateSchema.index({ name: 1 });
TemplateSchema.index({ type: 1 });
TemplateSchema.index({ category: 1 });
TemplateSchema.index({ isPremium: 1 });
TemplateSchema.index({ isActive: 1 });
TemplateSchema.index({ sortOrder: 1 });
TemplateSchema.index({ tags: 1 });

// Text search index for name and description
TemplateSchema.index({ name: 'text', description: 'text' });

export const Template = mongoose.model<ITemplate>('Template', TemplateSchema);
