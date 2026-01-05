
import puppeteer from 'puppeteer-core';
import { inject } from './inject';

export const htmlToPdf = async (htmlContent: string, outputPath: string, jsonData: any) => {
    let browser;

    // Check if we're running in Vercel (serverless) environment
    const isVercel = process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME;

    if (isVercel) {
        // Use chromium binary for Vercel
        const chromium = await import('@sparticuz/chromium');
        browser = await puppeteer.launch({
            args: chromium.default.args,
            defaultViewport: chromium.default.defaultViewport,
            executablePath: await chromium.default.executablePath(),
            headless: chromium.default.headless,
        });
    } else {
        // Use local Puppeteer for development
        const puppeteerFull = await import('puppeteer');
        browser = await puppeteerFull.default.launch({
            headless: true,
        });
    }

    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    await page.evaluate(inject, jsonData);
    const pdfBuffer = await page.pdf({
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