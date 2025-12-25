import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../models';

export const configurePassport = () => {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID || '',
                clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
                callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:4000/api/auth/google/callback',
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    const email = profile.emails?.[0]?.value;
                    if (!email) {
                        return done(new Error('No email found in Google profile'));
                    }

                    // Check if user exists in MongoDB
                    let user = await User.findOne({ googleId: profile.id });

                    if (!user) {
                        // Create new user in MongoDB
                        user = await User.create({
                            googleId: profile.id,
                            email,
                            name: profile.displayName || email,
                            picture: profile.photos?.[0]?.value || '',
                        });
                        console.log('✅ New user created:', user.email);
                    } else {
                        // Update user info if changed
                        user.name = profile.displayName || email;
                        user.picture = profile.photos?.[0]?.value || '';
                        await user.save();
                        console.log('✅ User updated:', user.email);
                    }

                    // Return user object compatible with JWT
                    return done(null, {
                        id: user._id.toString(),
                        email: user.email,
                        name: user.name,
                        picture: user.picture,
                        googleId: user.googleId,
                    });
                } catch (error) {
                    console.error('❌ Passport authentication error:', error);
                    return done(error as Error);
                }
            }
        )
    );

    passport.serializeUser((user: any, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id: string, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (error) {
            done(error, null);
        }
    });
};
