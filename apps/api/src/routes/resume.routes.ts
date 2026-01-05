import { Router, Request, Response } from 'express';
import multer from 'multer';
import * as pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import { resumeExtractionService } from '../services/resume-extraction.service';

const router = Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB max
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only PDF and DOC/DOCX files are allowed.'));
        }
    }
});

/**
 * Extract text from uploaded file (PDF  or DOC)
 */
async function extractTextFromFile(file: Express.Multer.File): Promise<string> {
    try {
        if (file.mimetype === 'application/pdf') {
            // Parse PDF - use default export
            const parse = (pdfParse as any).default || pdfParse;
            const pdfData = await parse(file.buffer);
            return pdfData.text;
        } else if (file.mimetype.includes('word') || file.mimetype.includes('document')) {
            // Parse Word document
            const result = await mammoth.extractRawText({ buffer: file.buffer });
            return result.value;
        }

        throw new Error('Unsupported file type');
    } catch (error) {
        console.error('File parsing error:', error);
        throw new Error('Failed to read uploaded file. Please ensure the file is not corrupted.');
    }
}

/**
 * POST /api/resume/extract
 * Extract structured resume data from text and/or file
 */
router.post('/extract', upload.single('file'), async (req: Request, res: Response) => {
    try {
        const { text } = req.body;
        const file = req.file;

        // Validate input
        if (!text && !file) {
            return res.status(400).json({
                success: false,
                message: 'Please provide either text input or upload a file'
            });
        }

        let textContent = text || '';
        let fileContent = '';

        // Extract content from uploaded file
        if (file) {
            try {
                fileContent = await extractTextFromFile(file);
            } catch (error: any) {
                return res.status(400).json({
                    success: false,
                    message: error.message || 'Failed to process uploaded file'
                });
            }
        }

        // Combine and extract structured data
        let extractedData;
        if (textContent && fileContent) {
            // Both provided - combine them
            extractedData = await resumeExtractionService.combineAndExtract(textContent, fileContent);
        } else if (fileContent) {
            // Only file provided
            extractedData = await resumeExtractionService.extractFromText(fileContent);
        } else {
            // Only text provided
            extractedData = await resumeExtractionService.extractFromText(textContent);
        }

        // Return structured data
        res.json({
            success: true,
            data: extractedData,
            message: 'Resume data extracted successfully'
        });

    } catch (error: any) {
        console.error('Resume extraction API error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to extract resume data. Please try again.'
        });
    }
});

/**
 * GET /api/resume/extraction-info
 * Get information about the extraction feature
 */
router.get('/extraction-info', (req: Request, res: Response) => {
    res.json({
        success: true,
        info: {
            supportedFormats: ['PDF', 'DOC', 'DOCX', 'Plain Text'],
            maxFileSize: '10MB',
            features: [
                'Multi-language support with auto-translation to English',
                'ATS-optimized content rewriting',
                'Automatic data structuring',
                'No fake data invention - only real extraction',
                'Professional formatting and keyword optimization'
            ],
            rateLimit: {
                free: '10 extractions per day',
                pro: 'Unlimited extractions'
            }
        }
    });
});

export default router;
