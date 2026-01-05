# API Deployment Guide for Vercel

## 🎯 Overview

This API has been configured to deploy as a serverless function on Vercel. The Express application automatically adapts to both local development and Vercel's serverless environment.

## 📋 Pre-Deployment Checklist

### 1. Install Dependencies
```bash
# From the root of the monorepo
npm install

# Or specifically for the API
cd apps/api && npm install
```

This will install the new Vercel-compatible dependencies:
- `puppeteer-core` - Lightweight Puppeteer for serverless
- `@sparticuz/chromium` - Chromium binary optimized for serverless environments

### 2. Test Local Build
```bash
# From root
npm run build:api

# Or from apps/api
npm run build
```

Make sure the TypeScript compilation succeeds without errors.

## 🚀 Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended for First Time)

1. **Login to Vercel**
   - Go to https://vercel.com
   - Sign in with GitHub

2. **Import Project**
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Vercel will detect it's a monorepo

3. **Configure Project**
   - **Project Name**: `your-api-name` (e.g., `profresume-api`)
   - **Framework Preset**: Other
   - **Root Directory**: `apps/api`
   - **Build Command**: Leave empty or use `npm run vercel-build`
   - **Output Directory**: Leave empty
   - **Install Command**: `cd ../.. && npm install`

4. **Environment Variables**
   - Click "Environment Variables"
   - Add all variables from `VERCEL_ENV.md`
   - Make sure to add them for "Production", "Preview", and "Development" as needed

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Note your deployment URL (e.g., `your-api.vercel.app`)

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login**
```bash
vercel login
```

3. **Deploy from API Directory**
```bash
cd apps/api
vercel
```

4. **Follow Prompts**
   - Set up and deploy: Yes
   - Which scope: [Your account/team]
   - Link to existing project: No
   - Project name: your-api-name
   - In which directory: ./
   - Override settings: No

5. **Add Environment Variables**
```bash
# Add each variable
vercel env add MONGODB_URI production
vercel env add GOOGLE_API_KEY production
# ... etc
```

6. **Deploy to Production**
```bash
vercel --prod
```

## 🔧 Post-Deployment Configuration

### 1. Update CORS Origins

In Vercel dashboard (or .env):
```
CORS_ORIGIN=https://your-editor.vercel.app,https://your-landing.vercel.app,https://your-admin.vercel.app
```

Redeploy after updating.

### 2. Update OAuth Callback URLs

**Google Cloud Console**:
1. Go to https://console.cloud.google.com
2. Select your project
3. APIs & Services → Credentials
4. Edit your OAuth 2.0 Client ID
5. Add to Authorized redirect URIs:
   ```
   https://your-api.vercel.app/api/auth/google/callback
   ```

### 3. Update Stripe Webhooks

**Stripe Dashboard**:
1. Go to https://dashboard.stripe.com/webhooks
2. Add endpoint: `https://your-api.vercel.app/api/payment/webhook`
3. Select events to listen for
4. Copy the webhook signing secret
5. Add to Vercel env vars as `STRIPE_WEBHOOK_SECRET`

### 4. Update Frontend API URLs

Update all frontend apps (editor, landing, admin, auth) to use the new API URL:
```env
NEXT_PUBLIC_API_URL=https://your-api.vercel.app
```

Redeploy all frontend apps.

### 5. Configure MongoDB Atlas

1. Go to MongoDB Atlas dashboard
2. Network Access → Add IP Address
3. Add `0.0.0.0/0` (allow from anywhere) for Vercel
   - Or whitelist specific Vercel IPs if you have them
4. Database Access → Ensure your user has readWrite permissions

## ⚙️ Configuration Files Created

### `vercel.json`
```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/index.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/index.ts"
    }
  ],
  "functions": {
    "src/index.ts": {
      "maxDuration": 60,
      "memory": 3008
    }
  }
}
```

**Key Points**:
- Uses `@vercel/node` builder for TypeScript/Node.js
- Routes all requests to the Express app
- Sets 60s timeout for PDF generation (requires Pro plan)
- Allocates 3GB memory for Puppeteer/Chromium

### Modified Files

1. **`src/index.ts`**
   - Now exports Express app for Vercel
   - Only starts server in non-production (local dev)
   - Environment check: `NODE_ENV !== 'production'`

2. **`package.json`**
   - Added `puppeteer-core` and `@sparticuz/chromium`
   - Added `vercel-build` script
   - Updated dev script to set `NODE_ENV=development`

3. **`packages/utils-server/src/puppeteer.ts`**
   - Detects Vercel environment
   - Uses `@sparticuz/chromium` in serverless
   - Falls back to regular Puppeteer locally

## 🧪 Testing the Deployment

### 1. Health Check
```bash
curl https://your-api.vercel.app/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2026-01-05T...",
  "uptime": 123.45,
  "database": {
    "connected": true,
    "status": "connected"
  }
}
```

### 2. Test PDF Generation
Use your frontend editor or test with curl:
```bash
curl -X POST https://your-api.vercel.app/api/generate-pdf \
  -H "Content-Type: application/json" \
  -d '{"templateId": "1", "data": {...}}'
```

### 3. Test Authentication
Visit: `https://your-api.vercel.app/api/auth/google`

Should redirect to Google OAuth.

## 🐛 Troubleshooting

### Build Fails

**Error**: `Cannot find module 'puppeteer'`
- **Solution**: Run `npm install` in root directory to install new dependencies

**Error**: `TypeScript compilation errors`
- **Solution**: Check `tsconfig.json` and fix any type errors
- Run `npm run build` locally first

### Runtime Errors

**Error**: `Exceeded maximum execution time`
- **Solution**: 
  - Free tier has 10s limit
  - Upgrade to Vercel Pro for 60s timeout
  - Or optimize PDF generation

**Error**: `Chromium failed to launch`
- **Solution**: 
  - Verify `@sparticuz/chromium` is installed
  - Check function memory allocation (should be 1024MB+)

**Error**: `Database connection failed`
- **Solution**:
  - Verify `MONGODB_URI` in Vercel env vars
  - Check MongoDB Atlas IP whitelist
  - Ensure database user has correct permissions

**Error**: `CORS error from frontend`
- **Solution**:
  - Verify `CORS_ORIGIN` includes all frontend URLs
  - Redeploy API after updating CORS

### Cold Start Issues

**Problem**: First request after inactivity is slow (5-10s)

**Solutions**:
- This is normal for serverless
- Consider upgrading to Vercel Pro for faster cold starts
- Use a service like UptimeRobot to ping your API every 5 minutes (keeps it warm)

## 📊 Monitoring

### View Logs
```bash
# Via CLI
vercel logs your-api-name

# Or in Vercel Dashboard
Project → Deployments → [Latest] → Runtime Logs
```

### Setup Alerts

1. **Vercel Dashboard**:
   - Project → Settings → Integrations
   - Add monitoring services (Datadog, Sentry, etc.)

2. **External Monitoring**:
   - UptimeRobot for uptime monitoring
   - Sentry for error tracking

## 🔄 Redeployment

### Automatic (Recommended)
- Push to your main branch
- Vercel auto-deploys on every push

### Manual
```bash
cd apps/api
vercel --prod
```

### Rollback
```bash
# Via CLI
vercel rollback

# Or in Dashboard
Deployments → [Previous Version] → Promote to Production
```

## 🎯 Performance Optimization

### 1. Reduce Cold Starts
- Keep functions warm with periodic health checks
- Optimize imports (lazy load heavy modules)

### 2. Optimize PDF Generation
- Cache templates where possible
- Reduce HTML complexity
- Use lower quality images if acceptable

### 3. Database Queries
- Add indexes to frequently queried fields
- Use connection pooling (Mongoose default)
- Consider caching with Redis for read-heavy operations

## 📝 Important Notes

### Limitations

1. **File Uploads**: 
   - Vercel has 4.5MB body size limit
   - For larger files, use S3 or similar cloud storage
   - Current implementation may need adjustment for large resume uploads

2. **Function Timeout**:
   - Free: 10 seconds
   - Pro: 60 seconds (currently configured)
   - Hobby: 10 seconds

3. **Memory**:
   - Configured for 3008MB (maximum)
   - Required for Puppeteer/Chromium

4. **Storage**:
   - `/tmp` directory is ephemeral
   - Don't rely on file persistence
   - Use cloud storage for uploads

### Security

1. **Environment Variables**:
   - Never commit `.env` files
   - Rotate secrets regularly
   - Use Vercel's encrypted env vars

2. **CORS**:
   - Only whitelist your domains
   - Don't use `*` in production

3. **Rate Limiting**:
   - Consider adding rate limiting middleware
   - Vercel has built-in DDoS protection

## 🆘 Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Node.js Runtime](https://vercel.com/docs/runtimes#official-runtimes/node-js)
- [Serverless Functions](https://vercel.com/docs/functions/serverless-functions)
- [@sparticuz/chromium](https://github.com/Sparticuz/chromium)

## ✅ Success!

Once deployed, you should see:
- ✅ Health endpoint responding
- ✅ Database connected
- ✅ PDF generation working
- ✅ Authentication flow working
- ✅ Frontend apps connecting successfully

Your API URL: `https://your-api-name.vercel.app`

---

**Last Updated**: January 5, 2026
