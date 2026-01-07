import { Router, Request, Response } from 'express';
import passport from 'passport';
import { generateToken, verifyToken, AuthRequest } from '../middleware/auth.middleware';
import { User } from '../models';
import { User as UserType } from '../types/user.types';

const router = Router();

// Get Google OAuth URL
router.get('/google/url', (req: Request, res: Response) => {
    try {
        const clientId = process.env.GOOGLE_CLIENT_ID;
        const callbackUrl = process.env.GOOGLE_CALLBACK_URL || 'https://api.profresume.com/api/auth/google/callback';
        const scope = 'profile email';

        const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
            `client_id=${clientId}&` +
            `redirect_uri=${encodeURIComponent(callbackUrl)}&` +
            `response_type=code&` +
            `scope=${encodeURIComponent(scope)}&` +
            `access_type=offline&` +
            `prompt=consent`;

        res.json({ url: googleAuthUrl });
    } catch (error) {
        console.error('Error generating Google OAuth URL:', error);
        res.status(500).json({ error: 'Failed to generate OAuth URL' });
    }
});

// Initiate Google OAuth (kept for backward compatibility)
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
}));

// Google OAuth callback
router.get('/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: `${process.env.FRONTEND_URL}/signin?error=auth_failed` }),
    (req: Request, res: Response) => {
        try {
            const user = req.user as UserType;

            if (!user) {
                return res.redirect(`${process.env.FRONTEND_URL}/signin?error=no_user`);
            }

            // Generate JWT token
            const token = generateToken(user.id, user.email);

            // Set token in HTTP-only cookie
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });

            // Redirect to frontend with success
            const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3001';
            res.redirect(`${frontendUrl}/auth/callback?success=true`);
        } catch (error) {
            console.error('Auth callback error:', error);
            res.redirect(`${process.env.FRONTEND_URL}/signin?error=server_error`);
        }
    }
);

// Verify token
router.get('/verify', verifyToken, (req: Request, res: Response) => {
    const authReq = req as AuthRequest;
    res.json({
        valid: true,
        user: authReq.user,
    });
});

// Get current user
router.get('/user', verifyToken, async (req: Request, res: Response) => {
    try {
        const authReq = req as AuthRequest;
        const userId = authReq.user?.userId;

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Query user from MongoDB
        const user = await User.findById(userId).select('-__v');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            id: user._id,
            email: user.email,
            name: user.name,
            picture: user.picture,
            googleId: user.googleId,
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

// Logout
router.post('/logout', (req: Request, res: Response) => {
    res.clearCookie('token');
    res.json({ success: true, message: 'Logged out successfully' });
});

export default router;
