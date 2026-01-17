/**
 * File Generator Utility
 * Generates PDF and DOCX files from HTML content
 */

import puppeteer from 'puppeteer';
import { Document, Packer, Paragraph, TextRun } from 'docx';

/**
 * Generate PDF from HTML content
 * Uses Puppeteer for high-quality PDF generation
 * 
 * @param htmlContent - HTML content to convert
 * @returns PDF buffer
 */
export async function generatePDF(htmlContent: string): Promise<Buffer> {
    let browser;

    try {
        // Launch browser (use chromium for Vercel compatibility)
        const chromium = process.env.VERCEL ? require('@sparticuz/chromium') : null;

        if (chromium) {
            // Vercel serverless environment
            browser = await puppeteer.launch({
                args: chromium.args,
                defaultViewport: chromium.defaultViewport,
                executablePath: await chromium.executablePath(),
                headless: chromium.headless,
            });
        } else {
            // Local development
            browser = await puppeteer.launch({
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            });
        }

        const page = await browser.newPage();

        // Set content
        await page.setContent(htmlContent, {
            waitUntil: 'networkidle0'
        });

        // Generate PDF
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                top: '48px',
                right: '48px',
                bottom: '48px',
                left: '48px'
            }
        });

        return Buffer.from(pdfBuffer);
    } catch (error) {
        console.error('PDF generation error:', error);
        throw new Error('Failed to generate PDF');
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

/**
 * Generate DOCX from plain text content
 * Uses docx library to create Word documents
 * 
 * @param content - Plain text content
 * @param fileName - Base filename (without extension)
 * @returns DOCX buffer
 */
export async function generateDOCX(content: string, fileName: string = 'cover-letter'): Promise<Buffer> {
    try {
        // Split content into paragraphs
        const paragraphs = content.split('\n').map(line => {
            return new Paragraph({
                children: [
                    new TextRun({
                        text: line,
                        font: 'Arial',
                        size: 24 // 12pt
                    })
                ],
                spacing: {
                    after: 200
                }
            });
        });

        // Create document
        const doc = new Document({
            sections: [{
                properties: {
                    page: {
                        margin: {
                            top: 1440, // 1 inch
                            right: 1440,
                            bottom: 1440,
                            left: 1440
                        }
                    }
                },
                children: paragraphs
            }]
        });

        // Generate buffer
        const buffer = await Packer.toBuffer(doc);
        return buffer;
    } catch (error) {
        console.error('DOCX generation error:', error);
        throw new Error('Failed to generate DOCX');
    }
}

/**
 * Get MIME type for format
 * 
 * @param format - File format
 * @returns MIME type
 */
export function getMimeType(format: 'pdf' | 'docx'): string {
    return format === 'pdf'
        ? 'application/pdf'
        : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
}

/**
 * Get file extension
 * 
 * @param format - File format
 * @returns File extension with dot
 */
export function getFileExtension(format: 'pdf' | 'docx'): string {
    return format === 'pdf' ? '.pdf' : '.docx';
}
