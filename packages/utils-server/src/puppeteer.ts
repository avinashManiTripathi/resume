import puppeteer from 'puppeteer';

let puppeteerBrowser: any = null;
const getBrowser = async (): Promise<any> => {
    if (!puppeteerBrowser) {
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
        await page.setContent(htmlContent, { waitUntil: 'networkidle2' });
        // Use type assertion to avoid union type conflicts between puppeteer and puppeteer-core
        await (page as any).evaluate((data: any) => {
            // Import inject logic inline to avoid type conflicts
            const inject = (data: any): void => {
                /* ---------- PROFILE ---------- */
                const p = data.personalInfo;

                const fullName = document.getElementById("full-name");
                const jobTitle = document.getElementById("job-title");
                const summaryText = document.getElementById("summary-text");
                const email = document.getElementById("email");
                const phone = document.getElementById("phone");

                if (fullName) fullName.textContent = `${p.firstName} ${p.lastName}`;
                if (jobTitle) jobTitle.textContent = p.jobTitle;
                if (summaryText) summaryText.textContent = p.summary;
                if (email) email.textContent = p.email;
                if (phone) phone.textContent = p.phone;

                /* ---------- ORDER ENGINE ---------- */
                const root = document.getElementById("resume-root") as HTMLElement;

                const map: Record<string, HTMLElement | null> = {
                    summary: document.getElementById("section-summary"),
                    experience: document.getElementById("section-experience"),
                    education: document.getElementById("section-education"),
                    skills: document.getElementById("section-skills"),
                    projects: document.getElementById("section-projects"),
                    languages: document.getElementById("section-languages"),
                    interests: document.getElementById("section-interests"),
                    achievements: document.getElementById("section-achievements"),
                    certifications: document.getElementById("section-certifications"),
                    awards: document.getElementById("section-awards"),
                    publications: document.getElementById("section-publications"),
                    volunteer: document.getElementById("section-volunteer"),
                    references: document.getElementById("section-references")
                };

                // Only reorder content sections, keep personalInfo (header) at the top
                data.order?.forEach((key: string) => {
                    // Skip personalInfo as it should always stay at the top
                    if (key === 'personalInfo') return;
                    const section = map[key];
                    if (section) root.appendChild(section);
                });
            };

            inject(data);
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