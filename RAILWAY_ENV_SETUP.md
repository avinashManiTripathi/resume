# Railway Environment Variables Setup Checklist

⚠️ **IMPORTANT**: Railway environment variables must be set in the Railway dashboard, NOT in .env files.

## How to Set Environment Variables in Railway

1. Go to your Railway project: https://railway.app
2. Click on your API service
3. Go to the "Variables" tab
4. Click "New Variable" for each variable below
5. After adding all variables, Railway will automatically redeploy

---

## Required Environment Variables

Copy-paste each of these into Railway (replace values with your actual credentials):

### Database
```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/resume
```

### Google OAuth
```
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=https://your-railway-domain.up.railway.app/api/auth/google/callback
```

### Stripe
```
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### AI
```
GENAI_API_KEY=AIzaSy...
```

### Security
```
JWT_SECRET=your-super-secret-jwt-key-min-32-chars-random-string
SESSION_SECRET=your-super-secret-session-key-min-32-chars-random-string
```

### CORS (Update after getting Railway URL)
```
CORS_ORIGIN=https://app.yourdomain.com,https://admin.yourdomain.com,https://auth.yourdomain.com,https://interview.yourdomain.com,https://yourdomain.com
```

### Frontend URLs (Update with your Vercel URLs)
```
FRONTEND_URL=https://app.yourdomain.com
ADMIN_URL=https://admin.yourdomain.com
AUTH_URL=https://auth.yourdomain.com
```

### Node Environment
```
NODE_ENV=production
PORT=4000
```

---

## After Setting Variables

1. Railway will automatically trigger a redeploy
2. Wait for deployment to complete
3. Check logs for any errors
4. Look for this message: `🚀 Server running on http://localhost:4000`
5. If you see the warning about Google OAuth credentials, you forgot to set them!

---

## Verification

After deployment, you should see in the logs:
- ✅ No "OAuth2Strategy requires a clientID option" error
- ✅ `🚀 Server running on http://localhost:4000`
- ✅ Database connection successful
- ✅ No crashes

---

## Troubleshooting

### Still seeing "OAuth2Strategy requires a clientID option"?
- Check that you set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in Railway Variables tab
- Make sure there are no typos in the variable names (they're case-sensitive)
- Verify variables by clicking on them in Railway dashboard

### Variables not loading?
- Railway injects variables directly into `process.env`
- You don't need .env files on Railway
- Check the "Variables" tab shows all your variables

### Need to update a variable?
- Click on the variable in Railway dashboard
- Edit the value
- Railway will automatically redeploy
