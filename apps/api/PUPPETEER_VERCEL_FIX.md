# 🎯 Puppeteer on Vercel - Solutions Guide

## ⚠️ The Problem

Puppeteer includes a full Chrome browser binary (~170MB), which:
- Exceeds Vercel's **50MB serverless function limit**
- May cause deployment failures or timeouts
- Not optimized for serverless environments

## ✅ Solution 1: Use `@sparticuz/chromium` (Recommended for Vercel)

This is a lightweight Chrome binary optimized for serverless (~40MB).

### Installation

```bash
npm install @sparticuz/chromium puppeteer-core
npm uninstall puppeteer
```

### Update `src/utils-server/puppeteer.ts`

```typescript
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import { inject } from './inject';

export const htmlToPdf = async (htmlContent: string, outputPath: string, jsonData: any) => {
    const browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
    });
    
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    await page.evaluate(inject, jsonData);
    
    const pdfBuffer = await page.pdf({
        path: outputPath,
        format: 'A4',
        printBackground: true,
        margin: {
            top: '10mm',
            bottom: '10mm',
            left: '5mm',
            right: '5mm',
        },
    });
    
    await browser.close();
    return pdfBuffer;
};
```

### Update `package.json`

```json
{
  "dependencies": {
    "@sparticuz/chromium": "^123.0.1",
    "puppeteer-core": "^23.11.1"
    // Remove "puppeteer": "^23.11.1"
  }
}
```

---

## ✅ Solution 2: Environment-Based (Local vs Serverless)

Keep Puppeteer for local development, use chromium for production.

```typescript
import { inject } from './inject';

export const htmlToPdf = async (htmlContent: string, outputPath: string, jsonData: any) => {
    let browser;
    
    if (process.env.VERCEL) {
        // Vercel/Production - use chromium
        const puppeteer = (await import('puppeteer-core')).default;
        const chromium = (await import('@sparticuz/chromium')).default;
        
        browser = await puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath(),
            headless: chromium.headless,
        });
    } else {
        // Local development - use full puppeteer
        const puppeteer = (await import('puppeteer')).default;
        browser = await puppeteer.launch();
    }
    
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    await page.evaluate(inject, jsonData);
    
    const pdfBuffer = await page.pdf({
        path: outputPath,
        format: 'A4',
        printBackground: true,
        margin: {
            top: '10mm',
            bottom: '10mm',
            left: '5mm',
            right: '5mm',
        },
    });
    
    await browser.close();
    return pdfBuffer;
};
```

---

## ✅ Solution 3: Deploy PDF Service Separately

Keep your API on Vercel, but deploy PDF generation on a platform that supports full Puppeteer.

### Platforms that support Puppeteer:
- **Railway** (recommended) - Easy deployment, $5/month
- **Render** - Free tier available
- **Fly.io** - Docker-based, good for custom setups
- **DigitalOcean App Platform**

### Architecture

```
┌─────────────┐       PDF Request       ┌──────────────────┐
│             │─────────────────────────▶│  PDF Service     │
│  Vercel API │                          │  (Railway/Render)│
│             │◀─────────────────────────│  w/ Puppeteer    │
└─────────────┘      PDF Buffer          └──────────────────┘
```

### Create separate `pdf-service` app:

```typescript
// pdf-service/index.ts
import express from 'express';
import puppeteer from 'puppeteer';

const app = express();
app.use(express.json({ limit: '10mb' }));

app.post('/generate-pdf', async (req, res) => {
    const { htmlContent, jsonData } = req.body;
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    
    const pdfBuffer = await page.pdf({ format: 'A4' });
    await browser.close();
    
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfBuffer);
});

app.listen(4001);
```

---

## ✅ Solution 4: Use External PDF Service (Easiest)

Replace Puppeteer entirely with a managed service.

### Options:

1. **PDFShift** (https://pdfshift.io)
   - $9/month for 1000 PDFs
   - Simple API

2. **DocRaptor** (https://docraptor.com)  
   - $15/month for 125 docs
   - Great HTML/CSS support

3. **PDF.co** (https://pdf.co)
   - Free tier: 300 requests/month

### Example with PDFShift:

```typescript
import axios from 'axios';

export const htmlToPdf = async (htmlContent: string) => {
    const response = await axios.post('https://api.pdfshift.io/v3/convert/pdf', {
        source: htmlContent,
        format: 'A4'
    }, {
        auth: {
            username: 'api',
            password: process.env.PDFSHIFT_API_KEY
        },
        responseType: 'arraybuffer'
    });
    
    return response.data;
};
```

---

## 📊 Comparison

| Solution | Cost | Complexity | Vercel Compatible | Recommended |
|----------|------|------------|------------------|-------------|
| @sparticuz/chromium | Free | Low | ✅ Yes | ⭐⭐⭐⭐⭐ |
| Separate PDF Service | $5/mo | Medium | ✅ Yes | ⭐⭐⭐⭐ |
| External PDF Service | $9-15/mo | Very Low | ✅ Yes | ⭐⭐⭐ |
| Standard Puppeteer | Free | Low | ❌ No | ❌ |

---

## 🚀 Recommended Action

1. **Try Solution 1 first** (@sparticuz/chromium) - it's the simplest and most cost-effective
2. **If issues persist**, use Solution 3 (separate PDF service on Railway)
3. **For production scale**, consider Solution 4 (managed service)

---

## 📝 Implementation Checklist

- [ ] Choose a solution above
- [ ] Update dependencies in `package.json`
- [ ] Modify `src/utils-server/puppeteer.ts`
- [ ] Test locally
- [ ] Commit and push
- [ ] Verify Vercel deployment succeeds
- [ ] Test PDF generation on production

---

**Need help implementing?** Let me know which solution you'd like to use!
