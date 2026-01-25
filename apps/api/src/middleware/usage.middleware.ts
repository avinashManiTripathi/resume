import { Request, Response, NextFunction } from 'express';
import { User, IUser } from '../models/User';

const DAILY_LIMIT = 5;

/**
 * Middleware to check and enforce daily usage limits for specific features
 */
export const checkUsageLimit = (feature: 'tailor' | 'ats') => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // If user is not authenticated, let the auth middleware handle 401 later
            // But if we're here, we expect req.user to be populated by auth middleware running BEFORE this
            if (!req.user) {
                return next();
            }

            const userId = (req.user as IUser)._id;
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            // check if dailyUsage exists, if not initialize
            if (!user.dailyUsage) {
                user.dailyUsage = {
                    date: new Date(),
                    tailorCount: 0,
                    atsCount: 0
                };
            }

            const now = new Date();
            const lastUsageDate = new Date(user.dailyUsage.date);

            // Check if it's a new day (simple check: different date string)
            // Or more robust: check if difference is > 24h OR if just the day changed.
            // Let's use simpler day string comparison for local daily reset logic
            const isNewDay = now.toDateString() !== lastUsageDate.toDateString();

            if (isNewDay) {
                // Reset counts
                user.dailyUsage.date = now;
                user.dailyUsage.tailorCount = 0;
                user.dailyUsage.atsCount = 0;
            }

            // Check specific limit
            const currentCount = feature === 'tailor' ? user.dailyUsage.tailorCount : user.dailyUsage.atsCount;

            if (currentCount >= DAILY_LIMIT) {
                return res.status(429).json({
                    error: 'Daily limit exceeded',
                    message: `You have reached your daily limit of ${DAILY_LIMIT} ${feature === 'ats' ? 'ATS checks' : 'Tailor generations'} for today. Please try again tomorrow.`,
                    limit: DAILY_LIMIT,
                    resetTime: 'Tomorrow' // Could be specific UTC midnight
                });
            }

            // Increment count
            if (feature === 'tailor') {
                user.dailyUsage.tailorCount += 1;
            } else {
                user.dailyUsage.atsCount += 1;
            }

            // Save user
            await user.save();

            // Proceed
            next();

        } catch (error) {
            console.error('Usage limit check error:', error);
            // Don't block on system error, but log it. 
            // Better to fail safe or fail closed? Fail closed for limits usually.
            next(); // Letting it pass for now to avoid breaking flow on DB error, but in strict systems might return 500.
        }
    };
};
