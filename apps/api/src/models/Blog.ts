import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
    title: string;
    slug: string;
    description: string;
    heroBadge: string;
    category: string;
    tags: string[];
    content: string;
    featuredImage?: string;
    publishDate: Date;
    status: 'draft' | 'published';
    relatedArticles?: mongoose.Types.ObjectId[];
    author: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const BlogSchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        heroBadge: {
            type: String,
            trim: true,
        },
        category: {
            type: String,
            required: true,
            trim: true,
        },
        tags: {
            type: [String],
            default: [],
        },
        content: {
            type: String,
            required: true,
        },
        featuredImage: {
            type: String,
        },
        publishDate: {
            type: Date,
            default: Date.now,
        },
        status: {
            type: String,
            enum: ['draft', 'published'],
            default: 'draft',
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        relatedArticles: [{
            type: Schema.Types.ObjectId,
            ref: 'Blog',
        }],
    },
    {
        timestamps: true,
    }
);

// Indexes for better query performance
BlogSchema.index({ slug: 1 });
BlogSchema.index({ status: 1 });
BlogSchema.index({ category: 1 });
BlogSchema.index({ publishDate: -1 });

export const Blog = mongoose.model<IBlog>('Blog', BlogSchema);
