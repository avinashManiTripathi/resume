import puppeteer, { Browser } from 'puppeteer';

let puppeteerBrowser: Browser | null = null;

const getBrowser = async (): Promise<Browser> => {
    if (!puppeteerBrowser || !puppeteerBrowser.isConnected()) {
        puppeteerBrowser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--disable-gpu',
            ],
        });
    }
    return puppeteerBrowser;
}

export const htmlToPdf = async (htmlContent: string, outputPath: string, jsonData: any) => {
    let browser = await getBrowser();
    const page = await browser.newPage();
    try {
        // Optimize: Wait for DOMContentLoaded instead of networkidle2 (saves ~500ms)
        await page.setContent(htmlContent, { waitUntil: 'networkidle2' });

        // Use type assertion to avoid union type conflicts between puppeteer and puppeteer-core
        await (page as any).evaluate(async (data: any) => {
            // Explicitly wait for fonts to load (critical for correct rendering)
            await document.fonts.ready;

            if ((window as any).hydrate) {
                await (window as any).hydrate(data);
            } else {
                console.error("Hydrate function not found on window!");
            }
        }, jsonData);

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
        return pdfBuffer;
    } catch (error) {
        throw error
    } finally {
        await page.close();
    }
};