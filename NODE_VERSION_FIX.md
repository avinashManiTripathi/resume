# Node.js Version Configuration Issue - Solution

## Problem
Deployment platforms are using Node.js 18.20.8, but Next.js 16 requires Node.js ≥20.9.0

## Solution Applied

### 1. Created `.nvmrc` files in EACH app directory:
- ✅ `/apps/landing/.nvmrc` → 20.11.0
- ✅ `/apps/auth/.nvmrc` → 20.11.0
- ✅ `/apps/editor/.nvmrc` → 20.11.0
- ✅ `/apps/admin/.nvmrc` → 20.11.0
- ✅ `/apps/api/.node-version` → 20.11.0
- ✅ Root `/.nvmrc` → 20.11.0

### 2. Updated `vercel.json` files with NODE_VERSION
All vercel.json files now include:
```json
"build": {
  "env": {
    "NODE_VERSION": "20.11.0"
  }
}
```

### 3. Updated root `package.json` engines
```json
"engines": {
  "node": ">=20.9.0",
  "npm": ">=10.0.0"
}
```

## For Vercel Deployment (Manual Configuration Required)

If the `.nvmrc` files are still not being detected, you MUST set the Node.js version **manually in Vercel Project Settings**:

### Steps for EACH Vercel Project:

1. Go to your project in Vercel Dashboard
2. Settings → General
3. Scroll to "Node.js Version"
4. Select **20.x** from dropdown
5. Save changes
6. Go to Deployments tab
7. Click "..." on failed deployment → Redeploy

**Do this for all 4 projects:**
- resume-landing
- resume-auth
- resume-editor
- resume-admin

## For Railway (API)

Railway should auto-detect `.node-version` file. If not:

1. Railway Project → Variables tab
2. Add new variable:
   - Key: `NODE_VERSION`
   - Value: `20.11.0`
3. Redeploy

## Alternative: Vercel CLI Deployment

If Vercel dashboard isn't picking up the version:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy each app with Node 20
cd apps/landing
vercel --prod -e NODE_VERSION=20.11.0

cd ../auth
vercel --prod -e NODE_VERSION=20.11.0

cd ../editor
vercel --prod -e NODE_VERSION=20.11.0

cd ../admin
vercel --prod -e NODE_VERSION=20.11.0
```

## Verification

After setting Node version, the build output should show:
```
Using Node.js 20.11.0
```

Instead of:
```
You are using Node.js 18.20.8
```

## Commit Changes

```bash
git add .
git commit -m "fix: Add .nvmrc to each app directory for Node 20 compatibility"
git push
```

Then trigger redeploy in Vercel/Railway dashboard.

## Why Multiple .nvmrc Files?

When Vercel builds with `Root Directory: apps/landing`, it looks for `.nvmrc` in:
1. `apps/landing/.nvmrc` ← NOW CREATED ✅
2. Root `/.nvmrc` (might not be detected from subdirectory)

Having both ensures the version is always found.
