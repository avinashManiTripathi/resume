# Environment Variables Configuration

## Landing Page (.env.local)
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

## Auth App (.env.local)
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
```

## Editor App (.env.local)
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

## Admin Panel (.env.local)
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

## API Backend (.env)
```env
NODE_ENV=production
PORT=4000

# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/resume

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=https://api.yourdomain.com/auth/google/callback

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# AI
GOOGLE_GENAI_API_KEY=AIza...

# JWT & Session
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
SESSION_SECRET=your-super-secret-session-key-min-32-chars

# CORS Origins (comma-separated)
CORS_ORIGIN=https://landing.yourdomain.com,https://auth.yourdomain.com,https://app.yourdomain.com,https://admin.yourdomain.com

# Frontend URLs
FRONTEND_URL=https://app.yourdomain.com
ADMIN_URL=https://admin.yourdomain.com
AUTH_URL=https://auth.yourdomain.com
```

## Important Notes

1. **Never commit .env files to git** - they're already in .gitignore
2. **NEXT_PUBLIC_ prefix** - Required for client-side environment variables in Next.js
3. **Production secrets** - Use strong, unique values for JWT_SECRET and SESSION_SECRET
4. **CORS_ORIGIN** - Must include all your frontend domains
5. **MongoDB Atlas** - Whitelist Railway/Render IPs or use 0.0.0.0/0

## Setting Environment Variables in Vercel

1. Go to Project Settings → Environment Variables
2. Add each variable from the appropriate section above
3. Select "Production" environment
4. Save changes
5. Redeploy to apply

## Setting Environment Variables in Railway

1. Go to your service → Variables tab
2. Click "New Variable"
3. Add each variable from the API Backend section
4. Changes apply automatically on next deploy
