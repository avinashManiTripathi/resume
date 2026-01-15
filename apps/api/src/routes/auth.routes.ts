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
        const { state } = req.query

        const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
            `client_id=${clientId}&` +
            `redirect_uri=${encodeURIComponent(callbackUrl)}&` +
            `response_type=code&` +
            `scope=${encodeURIComponent(scope)}&` +
            `access_type=offline&` +
            `state=${encodeURIComponent(state as string || '')}&` +
            `prompt=select_account`;

        res.json({ url: googleAuthUrl });
    } catch (error) {
        console.error('Error generating Google OAuth URL:', error);
        res.status(500).json({ error: 'Failed to generate OAuth URL' });
    }
});

// Initiate Google OAuth (kept for backward compatibility)
router.get('/google', (req: Request, res: Response, next) => {
    // Extract state from query parameter
    const state = req.query.state as string;

    // Pass state through to Google OAuth
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        session: false,
        state: state, // Pass state to Google OAuth
    })(req, res, next);
});

// Google OAuth callback
router.get('/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: `${process.env.FRONTEND_URL}/signin?error=auth_failed` }),
    (req: Request, res: Response) => {
        try {
            const user = req.user as UserType & { state?: string };

            // Get state from user object (set by passport) or query parameter
            const state = user.state || (req.query.state as string);

            console.log({ state, fromUser: user.state, fromQuery: req.query.state })

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
                domain: process.env.NODE_ENV === 'production' ? '.profresume.com' : '.profresume.com',
            });

            // Parse redirect URL from state parameter
            let redirectUrl: URL;
            if (state) {
                try {
                    // State is URL-encoded, decode it first
                    const decodedState = decodeURIComponent(state);
                    // State format might be: ?redirect=https://interview.profresume.com or redirect=https://interview.profresume.com
                    // Remove leading ? if present
                    const cleanState = decodedState.startsWith('?') ? decodedState.substring(1) : decodedState;
                    const stateParams = new URLSearchParams(cleanState);
                    const redirectParam = stateParams.get('redirect');

                    console.log('Debug state parsing:', { rawState: state, decodedState, cleanState, redirectParam });

                    if (redirectParam) {
                        // Remove trailing = if present (bug from frontend)
                        const cleanRedirect = redirectParam.endsWith('=') ? redirectParam.slice(0, -1) : redirectParam;
                        redirectUrl = new URL(cleanRedirect);
                        console.log('Using redirect from state:', cleanRedirect);
                    } else {
                        // Fallback to default frontend URL
                        redirectUrl = new URL(process.env.FRONTEND_URL || 'https://edit.profresume.com');
                        console.log('No redirect in state, using default:', redirectUrl.toString());
                    }
                } catch (error) {
                    console.error('Error parsing state parameter:', error);
                    redirectUrl = new URL(process.env.FRONTEND_URL || 'https://edit.profresume.com');
                }
            } else {
                // No state, use default
                redirectUrl = new URL(process.env.FRONTEND_URL || 'https://edit.profresume.com');
                console.log('No state parameter, using default:', redirectUrl.toString());
            }

            // Add success parameters to redirect URL
            redirectUrl.searchParams.set('success', 'true');
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
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        domain:
            process.env.NODE_ENV === 'production'
                ? '.profresume.com'
                : '.profresume.com',
        path: '/',
    })

    res.status(200).json({ message: 'Logged out successfully' })
});

export default router;
