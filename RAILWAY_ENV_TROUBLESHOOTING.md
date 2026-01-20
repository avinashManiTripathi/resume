# Railway Environment Variables - Troubleshooting Guide

## Problem: Environment Variables Not Loading on Railway

### Understanding How Railway Works

**IMPORTANT**: Railway does NOT use .env files!

1. ❌ Railway does NOT read from `.env` or `.env.production` files
2. ✅ Railway injects variables DIRECTLY into `process.env`
3. ✅ You MUST set variables in the Railway Dashboard (Variables tab)

### Why You're Seeing `injecting env (0)`

This is NORMAL and EXPECTED:
```
[dotenv@17.2.3] injecting env (0) from .env
[dotenv@17.2.3] injecting env (0) from .env.production
```

- The `(0)` means dotenv found 0 variables in .env files
- This is correct because .env files are in .gitignore (not committed)
- Railway provides variables through a different mechanism

### Your Current Situation

From your logs:
```
✅ App is running: "🚀 Server running on http://localhost:8080"
✅ Passport fix worked: Shows warning instead of crashing
❌ MongoDB failing: Trying to connect to localhost:27017
```

**Root Cause**: You haven't set `MONGODB_URI` in Railway's Variables tab yet.

---

## How to Properly Set Environment Variables in Railway

### Step-by-Step Instructions

1. **Go to Railway Dashboard**
   - Visit: https://railway.app
   - Login to your account

2. **Select Your Project**
   - Click on your resume builder project

3. **Select Your API Service**
   - Click on the API service (not the project level)

4. **Go to Variables Tab**
   - Look for tabs: "Deployments", "Settings", **"Variables"**, "Metrics"
   - Click on **"Variables"** tab
   - **NOT** the "Settings" tab!

5. **Add Variables**
   - Click "New Variable" button
   - Add each variable one by one:

### Required Variables to Add

```
MONGODB_URI
mongodb+srv://username:password@cluster.mongodb.net/database

GOOGLE_CLIENT_ID
your-client-id.apps.googleusercontent.com

GOOGLE_CLIENT_SECRET
your-secret-here

GENAI_API_KEY
AIzaSy...

JWT_SECRET
your-random-32-char-secret

SESSION_SECRET
another-random-32-char-secret

STRIPE_SECRET_KEY
sk_live_...

CORS_ORIGIN
https://app.yourdomain.com,https://admin.yourdomain.com
```

### After Adding Variables

1. Railway will automatically trigger a new deployment
2. Wait 1-2 minutes for deployment to complete
3. Check logs for the new diagnostic output

---

## Verification

After the next deployment, you should see in the logs:

```
==================================================
🔍 ENVIRONMENT VARIABLE CHECK
==================================================
MONGODB_URI: ✅ Set
GOOGLE_CLIENT_ID: ✅ Set (or ❌ NOT SET if you haven't added it)
GOOGLE_CLIENT_SECRET: ✅ Set (or ❌ NOT SET)
GENAI_API_KEY: ✅ Set (or ❌ NOT SET)
PORT: 8080
==================================================
```

And MongoDB should connect successfully:
```
✅ MongoDB connected successfully
📍 Database: resume
```

---

## Common Mistakes

### ❌ Mistake 1: Looking for .env file upload
Railway doesn't have a way to upload .env files. You must use the Variables tab.

### ❌ Mistake 2: Setting variables in wrong place
- ❌ Don't set in Project Settings
- ✅ Set in Service → Variables tab

### ❌ Mistake 3: Expecting dotenv to load variables
Railway injects variables BEFORE your app starts. dotenv is only for local development.

### ❌ Mistake 4: Variable name typos
Variable names are case-sensitive:
- ✅ `MONGODB_URI`
- ❌ `mongodb_uri`
- ❌ `MongoDBURI`

---

## Why It Works Locally But Not on Railway

**Locally:**
- You have `.env` file with variables
- dotenv reads from `.env` file
- Variables load into `process.env`
- ✅ Works!

**On Railway:**
- No `.env` file (gitignored, not committed)
- dotenv finds nothing (`injecting env (0)`)
- BUT Railway should inject variables directly
- ❌ Only works if you set them in Dashboard!

---

## Screenshot Guide

If you're still confused, take screenshots of:
1. Railway Dashboard → Your Service → Variables tab
2. Share the screenshot (blur any sensitive values)
3. We can verify you've set them correctly

---

## Quick Fix Checklist

- [ ] Open Railway dashboard
- [ ] Click your project
- [ ] Click API service
- [ ] Click "Variables" tab (not Settings)
- [ ] Click "New Variable"
- [ ] Add `MONGODB_URI` with your MongoDB Atlas connection string
- [ ] Click "Add" or "Save"
- [ ] Wait for automatic redeployment (1-2 minutes)
- [ ] Check logs for "✅ MongoDB connected successfully"

---

## Still Not Working?

If variables still don't load after following all steps:

1. **Verify variable names** - Must match exactly (case-sensitive)
2. **Check service selection** - Make sure you're in the right service
3. **Wait for deployment** - Changes trigger automatic redeploy
4. **Check logs** - Look for the diagnostic output we added
5. **Try raw variable** - Railway also supports "RAW" editor mode

---

## Contact Support

If you've verified everything and it still doesn't work:
- Railway Discord: https://discord.gg/railway
- Railway Support: help@railway.app
- Provide your project ID and service name
