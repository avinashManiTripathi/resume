import mongoose, { Schema, Document } from 'mongoose';

export interface IInterviewSession extends Document {
    userId: mongoose.Types.ObjectId | string;
    jobDescription: string;
    jdInfo: any;
    status: 'active' | 'paused' | 'completed';
    currentPhase: 'intro' | 'technical' | 'coding' | 'behavioral' | 'feedback';

    // Batch processing fields
    allQuestions?: {
        question: string;
        type: string;
        expectedPoints: string[];
    }[];
    currentQuestionIndex?: number;

    history: {
        role: 'interviewer' | 'candidate';
        content: string;
        timestamp?: Date;
        evaluation?: any;
        metadata?: any;
    }[];
    finalReport?: any;
    createdAt: Date;
    updatedAt: Date;
}

const InterviewSessionSchema: Schema = new Schema({
    userId: { type: Schema.Types.Mixed, required: false }, // Allow both ObjectId and String for guest users
    jobDescription: { type: String, required: true },
    jdInfo: { type: Object },
    status: { type: String, enum: ['active', 'paused', 'completed'], default: 'active' },
    currentPhase: { type: String, enum: ['intro', 'technical', 'coding', 'behavioral', 'feedback'], default: 'intro' },

    // Batch processing fields
    allQuestions: [{
        question: { type: String },
        type: { type: String },
        expectedPoints: [{ type: String }]
    }],
    currentQuestionIndex: { type: Number, default: 0 },

    history: [{
        role: { type: String, enum: ['interviewer', 'candidate'] },
        content: { type: String },
        timestamp: { type: Date, default: Date.now },
        evaluation: { type: Object },
        metadata: { type: Object }
    }],
    finalReport: { type: Object },
}, { timestamps: true });

export const InterviewSession = mongoose.model<IInterviewSession>('InterviewSession', InterviewSessionSchema);
