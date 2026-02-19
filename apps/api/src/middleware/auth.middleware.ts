import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWTPayload } from '../types/user.types';
import { config } from '../config';
import { Subscription, FeatureConfig, FeatureName } from '../models';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export interface AuthRequest extends Request {
    user?: JWTPayload;
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authReq = req as AuthRequest;

        // Get token from Authorization header or cookie
        const authHeader = authReq.headers.authorization;
        const token = authHeader?.startsWith('Bearer ')
            ? authHeader.substring(7)
            : authReq.cookies?.token;

        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
        authReq.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};

/**
 * Optional authentication middleware
 * Parses JWT token if present but doesn't block the request if missing
 * Useful for routes that work for both authenticated and guest users
 */
export const optionalAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authReq = req as AuthRequest;

        // Get token from Authorization header or cookie
        const authHeader = authReq.headers.authorization;
        const token = authHeader?.startsWith('Bearer ')
            ? authHeader.substring(7)
            : authReq.cookies?.token;

        if (token) {
            // Verify token if present
            try {
                const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
                authReq.user = decoded;
            } catch (error) {
                // Token is invalid, continue as guest
                console.log('Invalid token, continuing as guest');
            }
        }

        // Continue regardless of token presence
        next();
    } catch (error) {
        // Continue even if there's an error
        next();
    }
};

export const generateToken = (userId: string, email: string, role: 'user' | 'admin' = 'user'): string => {
    const payload: JWTPayload = {
        userId,
        email,
        role
    };

    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: '7d', // Token expires in 7 days
    });
};

/**
 * Middleware to verify user has admin role
 * Checks role from database, not just JWT (for security)
 */
export const requireAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authReq = req as AuthRequest;
        const userId = authReq.user?.userId;

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Dynamically import User model to avoid circular dependency
        const { User } = await import('../models');

        // Fetch user from database to get current role
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (user.role !== 'admin') {
            return res.status(403).json({
                error: 'Access denied. Admin role required.',
                message: 'You do not have permission to perform this action.'
            });
        }

        // User is admin, continue
        next();
    } catch (error) {
        console.error('Admin verification error:', error);
        return res.status(500).json({ error: 'Failed to verify admin status' });
    }
};

/**
 * Middleware to require an active pro/premium subscription based on dynamic feature configuration
 * @param featureName Name of the feature to check
 * @param allowPreview If true, allows 'intent=preview' to bypass the check
 */
export const requireSubscription = (featureName: FeatureName, allowPreview: boolean = false) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (config.byPassSubscription) {
                return next();
            }

            // Check if this feature is actually premium in the database
            const featureConfig = await FeatureConfig.findOne({ name: featureName });

            // If feature is not found or marked as not premium, allow access
            if (featureConfig && !featureConfig.isPremium) {
                return next();
            }

            // Check intent - if it's a preview and we allow it, bypass subscription check
            const intent = req.body?.intent || req.query?.intent;
            if (allowPreview && intent === 'preview') {
                return next();
            }

            const authReq = req as AuthRequest;
            const userId = authReq.user?.userId;

            if (!userId) {
                return res.status(401).json({ error: 'Authentication required' });
            }

            const subscription = await Subscription.findOne({
                userId,
                status: 'active',
                plan: { $in: ['pro', 'premium', 'lower'] }
            });

            if (!subscription) {
                return res.status(403).json({
                    error: 'Active subscription required',
                    message: `Please upgrade your plan to access ${featureName.replace('-', ' ')}`
                });
            }

            next();
        } catch (error) {
            console.error('Subscription verification error:', error);
            return res.status(500).json({ error: 'Failed to verify subscription' });
        }
    };
};
