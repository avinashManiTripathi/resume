import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../models';

export const configurePassport = () => {
    // Check if Google OAuth credentials are configured
    const googleClientId = process.env.GOOGLE_CLIENT_ID;
    const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const googleCallbackUrl = process.env.GOOGLE_CALLBACK_URL || 'https://api.profresume.com/api/auth/google/callback';

    if (!googleClientId || !googleClientSecret) {
        console.warn('⚠️  Google OAuth credentials not configured. Google authentication will not be available.');
        console.warn('   Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables to enable Google OAuth.');
        // Return early - don't configure Google strategy without credentials
        return;
    }

    passport.use(
        new GoogleStrategy(
            {
                clientID: googleClientId,
                clientSecret: googleClientSecret,
                callbackURL: googleCallbackUrl,
                passReqToCallback: true, // Enable request passthrough to access state
            },
            async (req: any, accessToken: string, refreshToken: string, profile: any, done: any) => {
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
                    // Preserve state parameter from the request
                    const state = req.query?.state || req.session?.state;

                    return done(null, {
                        id: user._id.toString(),
                        email: user.email,
                        name: user.name,
                        picture: user.picture,
                        googleId: user.googleId,
                        state: state, // Pass state through
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
