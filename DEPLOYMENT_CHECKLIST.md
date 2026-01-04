# Deployment Checklist

## Pre-Deployment

### 1. Code Preparation
- [x] Created Vercel config files for all Next.js apps
- [x] Created Railway config for API
- [x] Updated CORS to use environment variables
- [ ] Remove all `console.log` statements
- [ ] Remove hardcoded API URLs
- [ ] Test all builds locally

### 2. Environment Variables
- [ ] Copy all env vars from ENVIRONMENT_VARIABLES.md
- [ ] Generate strong secrets for JWT_SECRET and SESSION_SECRET
- [ ] Get production Stripe keys
- [ ] Get production Google OAuth credentials
- [ ] Get Google Gen AI API key

### 3. External Services Setup
- [ ] Create MongoDB Atlas cluster
- [ ] Get MongoDB connection string
- [ ] Setup Google Cloud OAuth project
- [ ] Setup Stripe account and get API keys
- [ ] Purchase domain name (if needed)

---

## Deployment Steps

### Step 1: Deploy API to Railway

1. [ ] Go to https://railway.app
2. [ ] Sign up/login with GitHub
3. [ ] Create new project → "Deploy from GitHub repo"
4. [ ] Select your repository
5. [ ] Set root directory: `apps/api`
6. [ ] Add all environment variables from ENVIRONMENT_VARIABLES.md
7. [ ] Deploy
8. [ ] Get Railway URL (e.g., `your-api.up.railway.app`)

### Step 2: Deploy Landing Page to Vercel

1. [ ] Go to https://vercel.com/new
2. [ ] Import GitHub repository
3. [ ] Project name: `resume-landing`
4. [ ] Root directory: `apps/landing`
5. [ ] Build command: `cd ../.. && npm run build:landing`
6. [ ] Install command: `cd ../.. && npm install`
7. [ ] Add environment variable: `NEXT_PUBLIC_API_URL=https://your-api.up.railway.app`
8. [ ] Deploy
9. [ ] Note Vercel URL

### Step 3: Deploy Auth App to Vercel

1. [ ] Vercel → New Project (same repo)
2. [ ] Project name: `resume-auth`
3. [ ] Root directory: `apps/auth`
4. [ ] Build command: `cd ../.. && npm run build:auth`
5. [ ] Install command: `cd ../.. && npm install`
6. [ ] Add env vars:
   - `NEXT_PUBLIC_API_URL`
   - `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
7. [ ] Deploy

### Step 4: Deploy Editor App to Vercel

1. [ ] Vercel → New Project
2. [ ] Project name: `resume-editor`
3. [ ] Root directory: `apps/editor`
4. [ ] Build command: `cd ../.. && npm run build:editor`
5. [ ] Install command: `cd ../.. && npm install`
6. [ ] Add env vars:
   - `NEXT_PUBLIC_API_URL`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
7. [ ] Deploy

### Step 5: Deploy Admin Panel to Vercel

1. [ ] Vercel → New Project
2. [ ] Project name: `resume-admin`
3. [ ] Root directory: `apps/admin`
4. [ ] Build command: `cd ../.. && npm run build:admin`
5. [ ] Install command: `cd ../.. && npm install`
6. [ ] Add env var: `NEXT_PUBLIC_API_URL`
7. [ ] Deploy

---

## Post-Deployment

### Step 6: Configure Custom Domains (Optional)

For each Vercel project:
1. [ ] Project Settings → Domains
2. [ ] Add custom domain
3. [ ] Update DNS records at your domain provider
4. [ ] Wait for SSL provisioning

For Railway API:
1. [ ] Project → Settings → Domains
2. [ ] Add custom domain
3. [ ] Update DNS CNAME record
4. [ ] Wait for SSL

### Step 7: Update OAuth & Webhooks

1. [ ] Google OAuth Console:
   - [ ] Add production callback URLs
2. [ ] Stripe Dashboard:
   - [ ] Add production webhook endpoint
   - [ ] Get webhook secret

### Step 8: Update Environment Variables

After getting deployment URLs:
1. [ ] Update all `NEXT_PUBLIC_API_URL` to actual Railway URL
2. [ ] Update `CORS_ORIGIN` in Railway with all Vercel URLs
3. [ ] Update OAuth callback URLs
4. [ ] Redeploy all apps

---

## Testing

### Functionality Tests
- [ ] Landing page loads
- [ ] Google OAuth login works
- [ ] Editor loads and fetches templates
- [ ] Template selection works
- [ ] PDF download works
- [ ] Image uploads work
- [ ] Admin CRUD operations work
- [ ] Payment flow works

### Technical Tests
- [ ] All HTTPS certificates active
- [ ] CORS working (no errors in console)
- [ ] Database connection stable
- [ ] Static files serving (images)
- [ ] Stripe webhooks receiving events
- [ ] Error pages display correctly

---

## Monitoring Setup

- [ ] Set up error tracking (Sentry)
- [ ] Set up uptime monitoring (UptimeRobot)
- [ ] Configure log aggregation
- [ ] Set up performance monitoring
- [ ] Enable Vercel Analytics

---

## Rollback Plan

If something goes wrong:
1. [ ] Document the issue
2. [ ] Revert to previous deployment in Vercel
3. [ ] Check Railway logs for API errors
4. [ ] Verify environment variables
5. [ ] Check MongoDB connection
6. [ ] Review CORS settings

---

## Quick Commands

```bash
# Test builds locally before deploying
npm run build:landing
npm run build:auth
npm run build:editor
npm run build:admin
npm run build:api

# Install Vercel CLI
npm install -g vercel

# Deploy from CLI (alternative)
cd apps/landing && vercel --prod
cd apps/auth && vercel --prod
cd apps/editor && vercel --prod
cd apps/admin && vercel --prod
```

---

## Support Links

- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app
- MongoDB Atlas: https://docs.atlas.mongodb.com
- Next.js Deployment: https://nextjs.org/docs/deployment
