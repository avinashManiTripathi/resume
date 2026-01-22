import puppeteer, { Browser } from 'puppeteer';

let puppeteerBrowser: Browser | null = null;

const getBrowser = async (): Promise<Browser> => {
    if (!puppeteerBrowser || !puppeteerBrowser.isConnected()) {
        puppeteerBrowser = await puppeteer.launch({
            headless: true, // ✅ better stability
            protocolTimeout: 120000, // ✅ FIX: prevent Target.createTarget timeout
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--disable-gpu',
                '--single-process',
                '--no-zygote',
            ],
        });
    }

    return puppeteerBrowser;
};

export const htmlToPdf = async (
    htmlContent: string,
    outputPath: string,
    jsonData: any
) => {
    const browser = await getBrowser();
    const page = await browser.newPage();

    try {
        // ✅ Prevent hanging requests
        page.setDefaultTimeout(120000);
        page.setDefaultNavigationTimeout(120000);

        // ✅ Load HTML safely
        await page.setContent(htmlContent, {
            waitUntil: 'domcontentloaded',
            timeout: 120000,
        });

        // ✅ Ensure fonts + hydration
        await page.evaluate(async (data) => {
            if (document.fonts?.ready) {
                await document.fonts.ready;
            }

            if ((window as any).hydrate) {
                await (window as any).hydrate(data);
            }
        }, jsonData);

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            preferCSSPageSize: true,
            margin: {
                top: '10mm',
                bottom: '10mm',
                left: '5mm',
                right: '5mm',
            },
        });

        return pdfBuffer;
    } catch (error) {
        console.error('PDF generation failed:', error);
        throw error;
    } finally {
        // ✅ Prevent crash if page already closed
        if (!page.isClosed()) {
            await page.close();
        }
    }
};
