# API Deployment Guide (Vercel Serverless)

## ✅ Changes Made for Vercel Compatibility

### 1. **Created Serverless Entry Point**
   - **File**: `api/index.ts`
   - Exports the Express app without calling `listen()`
   - Vercel automatically handles the server lifecycle

### 2. **Updated `app.ts`**
   - Added `createApp()` function to export the Express app
   - Kept `listen()` method for local development only

### 3. **Configured `vercel.json`**
   - Points to `api/index.ts` as the serverless function entry
   - Routes all requests to the serverless function

## 🚀 Deployment Steps

### 1. Install Vercel CLI (if not already installed)
```bash
npm i -g vercel
```

### 2. Set Environment Variables on Vercel
Before deploying, add these environment variables in your Vercel project dashboard:

```
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=https://your-domain.vercel.app/api/auth/google/callback
GOOGLE_API_KEY=your_google_api_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
JWT_SECRET=your_jwt_secret
CORS_ORIGIN=https://your-frontend-domain.com
NODE_ENV=production
```

### 3. Deploy to Vercel
```bash
cd apps/api
vercel --prod
```

## 📝 Local Development

For local development, continue using:
```bash
npm run dev
```

This uses `src/index.ts` which calls `app.listen()`.

## ⚠️ Important Notes

### Session & Passport Considerations
- **Sessions work on Vercel**, but are stateful and serverless functions are stateless by nature
- Each request may hit a different serverless instance
- For production, consider using:
  - **JWT-based auth** (stateless, recommended)
  - **External session store** (Redis, MongoDB sessions)

### File Uploads
- Vercel serverless functions have a **4.5MB payload limit**
- For file uploads, consider:
  - Direct upload to cloud storage (S3, Cloudinary)
  - Increase Vercel function size limits (requires Pro plan)

### Database Connection
- MongoDB connections are established on cold starts
- Use connection pooling to minimize overhead
- Consider using MongoDB Atlas for best performance

## 🔄 Differences from VPS Deployment

| Feature | VPS (Traditional) | Vercel (Serverless) |
|---------|------------------|---------------------|
| Server Process | Always running | Spins up per request |
| State | Stateful | Stateless |
| Scaling | Manual | Automatic |
| Cost | Fixed | Pay-per-use |
| File System | Persistent | Read-only ephemeral |

## 🐛 Troubleshooting

### Error: "No entrypoint found"
- Ensure `api/index.ts` exists
- Check `vercel.json` points to correct file

### Error: "Module not found"
- Ensure all dependencies are in `package.json`
- Run `npm install` before deploying

### Session not persisting
- Use external session store or switch to JWT auth

### Database connection timeout
- Check MongoDB allows connections from Vercel IPs (0.0.0.0/0)
- Increase connection timeout in MongoDB config

## 📚 Additional Resources

- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- [Express on Vercel](https://vercel.com/guides/using-express-with-vercel)
