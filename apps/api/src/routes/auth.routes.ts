import { Router, Request, Response } from 'express';
import passport from 'passport';
import { generateToken, verifyToken, AuthRequest } from '../middleware/auth.middleware';
import { User } from '../models';
import { User as UserType } from '../types/user.types';

const router = Router();

/**
 * Get cookie configuration for cross-subdomain authentication
 * - Uses .profresume.com domain to work across all subdomains
 * - SameSite=none for HTTPS cross-site contexts (auth → editor redirects)
 * - HttpOnly to prevent XSS attacks
 * - Secure flag for HTTPS-only transmission
 */
const getCookieOptions = () => ({
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: (process.env.NODE_ENV === 'production' ? 'none' : 'lax') as 'none' | 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    domain: process.env.NODE_ENV === 'production' ? '.profresume.com' : undefined,
    path: '/',
});

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

            // Set token in HTTP-only cookie with cross-subdomain support
            res.cookie('token', token, getCookieOptions());

            // Redirect to frontend with success (NO token in URL for security)
            const frontendUrl = process.env.FRONTEND_URL || 'https://edit.profresume.com';

            const redirectUrl = new URL(frontendUrl);
            redirectUrl.searchParams.set('success', 'true');
            // User info is available via /api/auth/user endpoint using the cookie

            console.log('Redirecting to:', redirectUrl.toString());
            res.redirect(redirectUrl.toString());
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
    // Clear cookie with same domain and path options used when setting it
    // This is critical for cross-subdomain cookie deletion
    res.clearCookie('token', {
        domain: process.env.NODE_ENV === 'production' ? '.profresume.com' : undefined,
        path: '/',
    });
    res.json({ success: true, message: 'Logged out successfully' });
});

export default router;
