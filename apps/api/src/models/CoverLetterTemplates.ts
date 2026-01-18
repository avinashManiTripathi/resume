import mongoose, { Schema, Document } from 'mongoose';

export interface ICoverLetterTemplate extends Document {
  type: string; // Friendly ID like "professional-standard"
  name: string;
  category: string;
  image: string;
  description: string;
  previewText: string;
  supportedFields: string[];
  templateBody: string;
  createdAt: Date;
  updatedAt: Date;
}

const CoverLetterTemplateSchema: Schema = new Schema(
  {
    type: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    image: {
      type: String,
      required: false,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    previewText: {
      type: String,
      required: true,
      trim: true,
    },
    supportedFields: {
      type: [String],
      default: [],
    },
    templateBody: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
CoverLetterTemplateSchema.index({ category: 1 });

export const CoverLetterTemplate = mongoose.model<ICoverLetterTemplate>('CoverLetterTemplate', CoverLetterTemplateSchema);
