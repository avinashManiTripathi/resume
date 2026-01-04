import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import { inject } from './inject';

export const htmlToPdf = async (htmlContent: string, outputPath: string, jsonData: any) => {
    // Configure chromium for Vercel serverless
    const browser = await puppeteer.launch({
        args: [...chromium.args, '--no-sandbox', '--disable-setuid-sandbox'],
        executablePath: await chromium.executablePath(),
        headless: true,
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