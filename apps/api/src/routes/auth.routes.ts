import { Router } from 'express';
import passport from 'passport';
import { generateToken, verifyToken, AuthRequest } from '../middleware/auth.middleware';
import { users } from '../config/passport';
import { User } from '../types/user.types';

const router = Router();

// Initiate Google OAuth
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
}));

// Google OAuth callback
router.get('/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: `${process.env.FRONTEND_URL}/signin?error=auth_failed` }),
    (req, res) => {
        try {
            const user = req.user as User;

            if (!user) {
                return res.redirect(`${process.env.FRONTEND_URL}/signin?error=no_user`);
            }

            // Generate JWT token
            const token = generateToken(user.id, user.email);

            // Redirect to frontend with token
            const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3001';
            res.redirect(`${frontendUrl}/auth/callback?token=${token}`);
        } catch (error) {
            console.error('Auth callback error:', error);
            res.redirect(`${process.env.FRONTEND_URL}/signin?error=server_error`);
        }
    }
);

// Verify token
router.get('/verify', verifyToken, (req, res) => {
    const authReq = req as AuthRequest;
    res.json({
        valid: true,
        user: authReq.user,
    });
});

// Get current user
router.get('/user', verifyToken, (req, res) => {
    try {
        const authReq = req as AuthRequest;
        const user = Array.from(users.values()).find(u => u.id === authReq.user?.userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            id: user.id,
            email: user.email,
            name: user.name,
            picture: user.picture,
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

// Logout
router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ success: true, message: 'Logged out successfully' });
});

export default router;
