
import puppeteer from 'puppeteer';
import { inject } from './inject';

export const htmlToPdf = async (htmlContent: string, outputPath: string, jsonData: any) => {
    const browser = await puppeteer.launch();
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