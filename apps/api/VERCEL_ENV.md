# Vercel API Environment Variables

## Required Environment Variables for Vercel Deployment

Add these in your Vercel project settings (Settings → Environment Variables):

### Database
```
MONGODB_URI=your_mongodb_atlas_connection_string
```

### Authentication
```
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
GOOGLE_CALLBACK_URL=https://your-api-domain.vercel.app/api/auth/google/callback
JWT_SECRET=your_random_jwt_secret_key
SESSION_SECRET=your_random_session_secret_key
```

### AI Services
```
GOOGLE_API_KEY=your_google_generative_ai_api_key
```

### Stripe
```
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

### CORS Configuration
```
CORS_ORIGIN=https://your-editor-app.vercel.app,https://your-landing-app.vercel.app,https://your-admin-app.vercel.app,https://your-auth-app.vercel.app
```

### General
```
NODE_ENV=production
PORT=3000
```

## Important Notes

1. **MongoDB Atlas**: Make sure your MongoDB cluster allows connections from Vercel IPs (0.0.0.0/0 for all IPs, or whitelist Vercel's IPs)

2. **Google OAuth**: Add your Vercel API domain to authorized redirect URIs in Google Cloud Console

3. **Stripe Webhooks**: Update webhook endpoint URL to your Vercel domain

4. **File Uploads**: Vercel has a 4.5MB body size limit and /tmp directory limitations. Large file uploads may need S3 or similar.

5. **Function Timeout**: Free tier has 10s timeout, Pro has 60s. PDF generation is set to 60s max.

6. **Cold Starts**: First request after inactivity may be slower due to serverless cold starts.
