import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../types/user.types';

// In-memory user store (replace with database in production)
const users: Map<string, User> = new Map();

export const configurePassport = () => {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID || '',
                clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
                callbackURL: `${process.env.API_URL || 'http://localhost:4000'}/api/auth/google/callback`,
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    const email = profile.emails?.[0]?.value;
                    if (!email) {
                        return done(new Error('No email found in Google profile'));
                    }

                    // Check if user exists
                    let user = Array.from(users.values()).find(u => u.googleId === profile.id);

                    if (!user) {
                        // Create new user
                        user = {
                            id: `user_${Date.now()}`,
                            email,
                            name: profile.displayName || email,
                            picture: profile.photos?.[0]?.value || '',
                            googleId: profile.id,
                            createdAt: new Date(),
                        };
                        users.set(user.id, user);
                    }

                    return done(null, user);
                } catch (error) {
                    return done(error as Error);
                }
            }
        )
    );

    passport.serializeUser((user: any, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id: string, done) => {
        const user = users.get(id);
        done(null, user || null);
    });
};

export { users };
