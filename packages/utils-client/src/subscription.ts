/**
 * Subscription management utilities for resume download protection
 */

export type SubscriptionTier = 'free' | 'pro' | 'premium';

export interface SubscriptionStatus {
    tier: SubscriptionTier;
    active: boolean;
    startDate: string;
    expiryDate?: string;
}

/**
 * Check if user has an active subscription (Pro or Premium)
 */
export function hasActiveSubscription(subscription: SubscriptionStatus | null): boolean {
    if (!subscription || !subscription.active) {
        return false;
    }

    // Free tier doesn't count as active subscription for downloads
    return subscription.tier === 'pro' || subscription.tier === 'premium';
}

/**
 * Check if user can download based on their subscription tier
 */
export function canDownload(subscription: any): boolean {
    if (!subscription) {
        return false;
    }

    // Handle both old format (tier, active, expiryDate) and new format (plan, status, endDate)
    const plan = subscription.plan || subscription.tier;
    const status = subscription.status;
    const endDate = subscription.endDate || subscription.expiryDate;

    // Check if plan is a paid tier (lower/basic, pro, or premium - NOT free)
    const isPaidTier = plan === 'lower' || plan === 'pro' || plan === 'premium';

    if (!isPaidTier) {
        return false;
    }

    // Check if subscription is active
    if (status && status !== 'active') {
        return false;
    }

    // Check if subscription hasn't expired (if endDate is set)
    if (endDate) {
        const expiryDate = new Date(endDate);
        const now = new Date();
        if (expiryDate < now) {
            return false; // Subscription has expired
        }
    }

    return true;
}

/**
 * Get subscription tier display name
 */
export function getTierDisplayName(tier: SubscriptionTier): string {
    const names: Record<SubscriptionTier, string> = {
        free: 'Free',
        pro: 'Pro',
        premium: 'Premium',
    };

    return names[tier];
}

/**
 * Get subscription tier features
 */
export function getTierFeatures(tier: SubscriptionTier): string[] {
    const features: Record<SubscriptionTier, string[]> = {
        free: [
            'Create and edit resume',
            'Real-time preview',
            'Basic templates',
            'Auto-save functionality',
        ],
        pro: [
            'Everything in Free',
            'Unlimited PDF downloads',
            'Access to 5+ premium templates',
            'Export to Word format',
            'Basic customer support',
            'Remove watermarks',
        ],
        premium: [
            'Everything in Pro',
            'Unlimited premium templates',
            'Priority customer support',
            'Custom branding options',
            'Advanced formatting tools',
            'Resume analytics',
            'Cover letter builder',
        ],
    };

    return features[tier];
}

/**
 * Get subscription tier price
 */
export function getTierPrice(tier: SubscriptionTier): { amount: number; period: string } {
    const prices: Record<SubscriptionTier, { amount: number; period: string }> = {
        free: { amount: 0, period: 'forever' },
        pro: { amount: 9, period: 'month' },
        premium: { amount: 19, period: 'month' },
    };

    return prices[tier];
}
