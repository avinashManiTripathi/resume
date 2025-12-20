
import puppeteer from 'puppeteer';

export const htmlToPdf = async (htmlContent: string, outputPath: string) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
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