import puppeteer, { Browser, Page } from 'puppeteer';

/* =====================================================
   FONT + CSS MEMORY CACHE
===================================================== */

const cssCache = new Map<string, string>();
const fontCache = new Map<string, string>();

function googleFontCssUrl(fontFamily: string) {
    return `https://fonts.googleapis.com/css2?family=${fontFamily.replace(
        /\s+/g,
        '+'
    )}:wght@400;700&display=swap`;
}

async function fetchGoogleFontCSS(fontFamily: string): Promise<string> {
    const url = googleFontCssUrl(fontFamily);

    if (cssCache.has(url)) {
        console.log('✅ Google Fonts CSS from cache');
        return cssCache.get(url)!;
    }

    console.log('🌐 Fetching Google Fonts CSS');
    const res = await fetch(url, {
        headers: {
            // Force modern woff2 response
            'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120',
        },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch Google Fonts CSS');
    }

    const css = await res.text();
    cssCache.set(url, css);
    return css;
}

function extractWoff2(css: string): { weight: number; url: string }[] {
    const fonts: { weight: number; url: string }[] = [];
    const blocks = css.split('@font-face');

    for (const block of blocks) {
        const weightMatch = block.match(/font-weight:\s*(\d+)/);
        const urlMatch = block.match(/url\((https:[^)]+\.woff2)\)/);

        if (weightMatch && urlMatch) {
            fonts.push({
                weight: Number(weightMatch[1]),
                url: urlMatch[1],
            });
        }
    }

    return fonts;
}

async function fetchFontBase64(url: string): Promise<string> {
    if (fontCache.has(url)) {
        console.log('✅ Font from memory cache');
        return fontCache.get(url)!;
    }

    console.log('⬇️ Downloading font:', url);
    const res = await fetch(url, {
        headers: {
            'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120',
        },
    });
    if (!res.ok) throw new Error('Font download failed');

    const buffer = Buffer.from(await res.arrayBuffer());
    const base64 = buffer.toString('base64');

    fontCache.set(url, base64);
    return base64;
}

async function injectGoogleFont(page: Page, fontFamily: string) {
    const css = await fetchGoogleFontCSS(fontFamily);
    const fonts = extractWoff2(css);

    let style = '';

    for (const font of fonts) {
        const base64 = await fetchFontBase64(font.url);

        style += `
            @font-face {
                font-family: '${fontFamily}';
                src: url(data:font/woff2;base64,${base64}) format('woff2');
                font-weight: ${font.weight};
                font-style: normal;
                font-display: swap;
            }
        `;
    }

    style += `
        body {
            font-family: '${fontFamily}', Arial, sans-serif;
        }
    `;

    await page.addStyleTag({ content: style });

    // Ensure font is ready before PDF
    await page.evaluate(async () => {
        if (document.fonts) {
            await document.fonts.ready;
        }
    });
}

/* =====================================================
   PUPPETEER BROWSER MANAGER (SCALABLE)
===================================================== */

const MAX_CONCURRENT_PAGES = 100;
const MAX_REQUESTS_PER_BROWSER = 200;
const QUEUE_TIMEOUT_MS = 60000; // 60s timeout for waiting in queue

let puppeteerBrowser: Browser | null = null;
let activePages = 0;
let totalRequestsHandled = 0;
const requestQueue: Array<{
    resolve: () => void;
    reject: (err: Error) => void;
    timer: NodeJS.Timeout;
}> = [];

// Check queue and process next request if slot available
const processQueue = () => {
    if (activePages >= MAX_CONCURRENT_PAGES || requestQueue.length === 0) return;

    const nextRequest = requestQueue.shift();
    if (nextRequest) {
        clearTimeout(nextRequest.timer);
        activePages++;
        nextRequest.resolve();
    }
};

// Acquire a slot (wait if queue full)
const acquirePageSlot = async (): Promise<void> => {
    if (activePages < MAX_CONCURRENT_PAGES) {
        activePages++;
        return;
    }

    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            // Remove from queue if timed out
            const index = requestQueue.findIndex(r => r.reject === reject);
            if (index !== -1) requestQueue.splice(index, 1);
            reject(new Error(`Server busy: PDF generation queue timeout. Active pages: ${activePages}`));
        }, QUEUE_TIMEOUT_MS);

        requestQueue.push({ resolve, reject, timer });
    });
};

// Release slot and process next
const releasePageSlot = () => {
    activePages--;
    processQueue();
};

const getBrowser = async (): Promise<Browser> => {
    // restart browser if limit reached and no active pages
    if (puppeteerBrowser && totalRequestsHandled >= MAX_REQUESTS_PER_BROWSER && activePages === 0) {
        console.log('♻️ Restarting Puppeteer browser to free memory...');
        await puppeteerBrowser.close();
        puppeteerBrowser = null;
        totalRequestsHandled = 0;
    }

    if (!puppeteerBrowser || !puppeteerBrowser.isConnected()) {
        console.log('🚀 Launching new Puppeteer instance...');
        puppeteerBrowser = await puppeteer.launch({
            headless: true,
            protocolTimeout: 120000,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--disable-gpu',
                '--single-process',
                '--no-zygote',
                // Performance Flags
                '--disable-extensions',
                '--mute-audio',
                '--disable-background-networking',
                '--disable-background-timer-throttling',
                '--disable-backgrounding-occluded-windows',
                '--disable-breakpad',
                '--disable-component-extensions-with-background-pages',
                '--disable-features=TranslateUI,BlinkGenPropertyTrees',
                '--disable-ipc-flooding-protection',
                '--disable-renderer-backgrounding',
            ],
        });
    }

    return puppeteerBrowser;
};

/**
 * Pre-warm browser and fonts to reduce latency on first request
 */
export const preWarmPuppeteer = async () => {
    console.log('🔥 Pre-warming Puppeteer and Fonts...');
    try {
        // 1. Launch Browser
        await getBrowser();

        // 2. Pre-fetch common fonts
        const commonFonts = ['Inter', 'Roboto', 'Open Sans'];
        await Promise.all(commonFonts.map(async (font) => {
            try {
                const css = await fetchGoogleFontCSS(font);
                const fonts = extractWoff2(css);
                // Fetch only the normal weight (400) to save time, or all if critical
                const normalFont = fonts.find(f => f.weight === 400);
                if (normalFont) {
                    await fetchFontBase64(normalFont.url);
                }
            } catch (e) {
                console.warn(`Failed to pre-warm font ${font}`, e);
            }
        }));

        console.log('✅ Puppeteer pre-warmed successfully');
    } catch (error) {
        console.error('❌ Failed to pre-warm Puppeteer:', error);
    }
};

/* =====================================================
   HTML → PDF
===================================================== */

export const htmlToPdf = async (
    htmlContent: string,
    outputPath: string,
    jsonData: any
) => {
    await acquirePageSlot(); // Wait for slot

    let page: Page | null = null;

    try {
        const browser = await getBrowser();
        page = await browser.newPage();
        totalRequestsHandled++;

        page.setDefaultTimeout(120000);
        page.setDefaultNavigationTimeout(120000);

        await page.setContent(htmlContent, {
            waitUntil: 'domcontentloaded',
            timeout: 120000,
        });

        // 🔥 Inject Google Font via Node memory cache
        if (jsonData?.fontFamily) {
            await injectGoogleFont(page, jsonData.fontFamily);
        }

        // Optional hydration
        await page.evaluate(async (data) => {
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
        if (page && !page.isClosed()) {
            await page.close().catch(e => console.error("Error closing page:", e));
        }
        releasePageSlot(); // Release slot for next request
    }
};

import { Readable } from 'stream';

/**
 * Stream PDF generation to memory efficiency
 */
export const htmlToPdfStream = async (
    htmlContent: string,
    jsonData: any
): Promise<Readable> => {
    await acquirePageSlot(); // Wait for slot

    let page: Page | null = null;
    let browser: Browser | null = null;

    try {
        browser = await getBrowser();
        page = await browser.newPage();
        totalRequestsHandled++;

        page.setDefaultTimeout(120000);
        page.setDefaultNavigationTimeout(120000);

        await page.setContent(htmlContent, {
            waitUntil: 'domcontentloaded',
            timeout: 120000,
        });

        // 🔥 Inject Google Font
        if (jsonData?.fontFamily) {
            await injectGoogleFont(page, jsonData.fontFamily);
        }

        // Optional hydration
        await page.evaluate(async (data) => {
            if ((window as any).hydrate) {
                await (window as any).hydrate(data);
            }
        }, jsonData);

        const pdfStreamWeb = await page.createPDFStream({
            format: 'A4',
            printBackground: true,
            preferCSSPageSize: true,
            margin: {
                top: '10mm',
                bottom: '10mm',
                left: '5mm',
                right: '5mm',
            },
            timeout: 120000
        });

        // Convert Web Stream to Node Stream for piping
        const pdfStream = Readable.fromWeb(pdfStreamWeb as any);

        // Hook into stream end/error to cleanup page slot
        const cleanup = async () => {
            if (page && !page.isClosed()) {
                await page.close().catch(e => console.error("Error closing page stream:", e));
            }
            releasePageSlot();
        };

        pdfStream.on('end', cleanup);
        pdfStream.on('error', cleanup);

        return pdfStream;
    } catch (error) {
        console.error('PDF stream generation failed:', error);
        if (page && !page.isClosed()) {
            await page.close().catch(e => console.error("Error closing page on fail:", e));
        }
        releasePageSlot();
        throw error;
    }
};
