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

const STORAGE_KEY = 'resumeSubscription';

/**
 * Get the current subscription status from localStorage
 */
export function getSubscription(): SubscriptionStatus | null {
    if (typeof window === 'undefined') return null;

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return null;

        const subscription: SubscriptionStatus = JSON.parse(stored);

        // Check if subscription has expired
        if (subscription.expiryDate) {
            const expiryDate = new Date(subscription.expiryDate);
            const now = new Date();

            if (now > expiryDate) {
                // Subscription expired, remove it
                localStorage.removeItem(STORAGE_KEY);
                return null;
            }
        }

        return subscription;
    } catch (error) {
        console.error('Error reading subscription from localStorage:', error);
        return null;
    }
}

/**
 * Save subscription status to localStorage
 */
export function setSubscription(tier: SubscriptionTier, durationMonths?: number): SubscriptionStatus {
    const startDate = new Date().toISOString();
    let expiryDate: string | undefined;

    // Calculate expiry date if duration is provided
    if (durationMonths && durationMonths > 0) {
        const expiry = new Date();
        expiry.setMonth(expiry.getMonth() + durationMonths);
        expiryDate = expiry.toISOString();
    }

    const subscription: SubscriptionStatus = {
        tier,
        active: true,
        startDate,
        expiryDate,
    };

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(subscription));
    } catch (error) {
        console.error('Error saving subscription to localStorage:', error);
    }

    return subscription;
}

/**
 * Remove subscription from localStorage
 */
export function clearSubscription(): void {
    if (typeof window === 'undefined') return;

    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error('Error clearing subscription from localStorage:', error);
    }
}

/**
 * Check if user has an active subscription (Pro or Premium)
 */
export function hasActiveSubscription(): boolean {
    const subscription = getSubscription();

    if (!subscription || !subscription.active) {
        return false;
    }

    // Free tier doesn't count as active subscription for downloads
    return subscription.tier === 'pro' || subscription.tier === 'premium';
}

/**
 * Check if user can download based on their subscription tier
 */
export function canDownload(): boolean {
    return hasActiveSubscription();
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
