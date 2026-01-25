import mongoose, { Schema, Document } from 'mongoose';

export enum SubscriptionPlan {
    FREE = 'free',
    PRO = 'pro',
    PREMIUM = 'premium',
}

export enum SubscriptionStatus {
    ACTIVE = 'active',
    CANCELLED = 'cancelled',
    EXPIRED = 'expired',
    TRIAL = 'trial',
}

export interface ISubscription extends Document {
    userId: mongoose.Types.ObjectId;
    plan: SubscriptionPlan;
    status: SubscriptionStatus;
    startDate: Date;
    endDate?: Date;
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
    paymentId?: string;
    razorpayOrderId?: string;
    razorpaySignature?: string;
    createdAt: Date;
    updatedAt: Date;
}

const SubscriptionSchema: Schema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },
        plan: {
            type: String,
            enum: Object.values(SubscriptionPlan),
            default: SubscriptionPlan.FREE,
            required: true,
        },
        status: {
            type: String,
            enum: Object.values(SubscriptionStatus),
            default: SubscriptionStatus.ACTIVE,
            required: true,
        },
        startDate: {
            type: Date,
            default: Date.now,
            required: true,
        },
        endDate: {
            type: Date,
        },
        stripeCustomerId: {
            type: String,
            sparse: true,
        },
        stripeSubscriptionId: {
            type: String,
            sparse: true,
        },
        paymentId: {
            type: String,
            sparse: true,
        },
        razorpayOrderId: {
            type: String,
            sparse: true,
        },
        razorpaySignature: {
            type: String,
            sparse: true,
        },
    },
    {
        timestamps: true,
    }
);

// Indexes
SubscriptionSchema.index({ status: 1 });

export const Subscription = mongoose.model<ISubscription>('Subscription', SubscriptionSchema);
