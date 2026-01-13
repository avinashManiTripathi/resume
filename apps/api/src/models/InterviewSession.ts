import mongoose, { Schema, Document } from 'mongoose';

export interface IInterviewSession extends Document {
    userId: mongoose.Types.ObjectId;
    jobDescription: string;
    jdInfo: any;
    status: 'active' | 'paused' | 'completed';
    currentPhase: 'intro' | 'technical' | 'coding' | 'behavioral' | 'feedback';
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
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    jobDescription: { type: String, required: true },
    jdInfo: { type: Object },
    status: { type: String, enum: ['active', 'paused', 'completed'], default: 'active' },
    currentPhase: { type: String, enum: ['intro', 'technical', 'coding', 'behavioral', 'feedback'], default: 'intro' },
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
