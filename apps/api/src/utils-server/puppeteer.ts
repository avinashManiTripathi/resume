import { inject } from './inject';

export const htmlToPdf = async (
    htmlContent: string,
    jsonData: any
) => {
    let browser;

    // Detect environment: use chromium for Vercel, regular puppeteer for local
    if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
        // Production: Use serverless-optimized chromium
        const puppeteer = (await import('puppeteer-core')).default;
        const chromium = (await import('@sparticuz/chromium')).default;

        browser = await puppeteer.launch({
            args: chromium.args,
            executablePath: await chromium.executablePath(),
            headless: true, // Chromium doesn't have a headless property
        });
    } else {
        // Local development: Use regular puppeteer with system Chrome
        const puppeteer = (await import('puppeteer')).default;

        browser = await puppeteer.launch({
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
