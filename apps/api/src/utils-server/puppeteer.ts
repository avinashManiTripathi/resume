import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import { inject } from './inject';

export const htmlToPdf = async (
    htmlContent: string,
    jsonData: any
) => {
    const browser = await puppeteer.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath(),
        headless: true, // ✅ explicitly set
        defaultViewport: {
            width: 1280,
            height: 800,
        },
    });

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
