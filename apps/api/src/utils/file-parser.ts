import pdf from 'pdf-parse';
import mammoth from 'mammoth';

/**
 * Extract text from PDF file using pdf-parse
 * @param file - Buffer containing the PDF file
 * @returns Promise<string> - Extracted text content
 */
export async function extractTextFromPDF(file: Buffer): Promise<string> {
    try {
        // Simple pdf-parse usage - just call it as a function
        const data = await pdf(file);

        if (!data || !data.text) {
            throw new Error('No text extracted from PDF');
        }

        console.log('PDF parsed successfully, text length:', data.text.length);
        return data.text;
    } catch (error: any) {
        console.error('PDF parsing error:', error);
        throw new Error(`Failed to extract text from PDF: ${error.message}`);
    }
}

/**
 * Extract text from DOCX file using mammoth
 * @param buffer - Buffer containing the DOCX file
 * @returns Promise<string> - Extracted text content
 */
export async function extractTextFromDOCX(buffer: Buffer): Promise<string> {
    try {
        const result = await mammoth.extractRawText({ buffer });
        return result.value;
    } catch (error: any) {
        console.error('DOCX parsing error:', error);
        throw new Error(`Failed to extract text from DOCX: ${error.message}`);
    }
}

/**
 * Extract text from uploaded file (supports PDF and DOCX)
 * @param file - Buffer containing the file
 * @param mimeType - MIME type of the file
 * @returns Promise<string> - Extracted text content
 */
export async function extractTextFromFile(file: Buffer, mimeType: string): Promise<string> {
    if (mimeType === 'application/pdf') {
        return extractTextFromPDF(file);
    } else if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        return extractTextFromDOCX(file);
    } else {
        throw new Error(`Unsupported file type: ${mimeType}`);
    }
}
