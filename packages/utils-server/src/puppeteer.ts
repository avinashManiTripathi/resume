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
    const res = await fetch(url);
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
   PUPPETEER BROWSER (REUSED)
===================================================== */

let puppeteerBrowser: Browser | null = null;

const getBrowser = async (): Promise<Browser> => {
    if (!puppeteerBrowser || !puppeteerBrowser.isConnected()) {
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
            ],
        });
    }

    return puppeteerBrowser;
};

/* =====================================================
   HTML → PDF
===================================================== */

export const htmlToPdf = async (
    htmlContent: string,
    outputPath: string,
    jsonData: any
) => {
    const browser = await getBrowser();
    const page = await browser.newPage();

    try {
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
        if (!page.isClosed()) {
            await page.close();
        }
    }
};
