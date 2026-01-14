import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWTPayload } from '../types/user.types';

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

export const generateToken = (userId: string, email: string): string => {
    const payload: JWTPayload = {
        userId,
        email,
    };

    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: '7d', // Token expires in 7 days
    });
};
