import { Router, Request, Response } from 'express';
import multer from 'multer';
import { analyzeResumeWithAI } from '../services/ai-analysis.service';
import { extractTextFromFile, extractTextFromDOCX } from '../utils/file-parser';
import { optionalAuth, verifyToken, requireSubscription } from '../middleware/auth.middleware';
import { FeatureName } from '../models';

const router = Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf' ||
            file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF and DOCX files are allowed'));
        }
    }
});

/**
 * Check ATS score
 * POST /api/ats/check
 */
router.post('/check', optionalAuth, requireSubscription(FeatureName.ATS_CHECK), upload.single('resume'), async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Extract text from file
        const resumeText = await extractTextFromFile(req.file.buffer, req.file.mimetype);

        if (!resumeText || resumeText.trim().length < 100) {
            return res.status(400).json({
                error: 'Could not extract enough text from the resume. Please ensure the file is not corrupted.'
            });
        }

        // Analyze with Gemini AI
        const analysis = await analyzeResumeWithAI(resumeText);

        res.json(analysis);
    } catch (error) {
        console.error('Error checking ATS score:', error);
        res.status(500).json({
            error: error instanceof Error ? error.message : 'Failed to analyze resume'
        });
    }
});

/**
 * Get sample analysis (for testing)
 * GET /api/ats/sample
 */
router.get('/sample', async (req: Request, res: Response) => {
    const sampleResult = {
        score: 78,
        feedback: {
            strengths: [
                "Strong use of action verbs throughout the resume",
                "Quantifiable achievements with specific metrics",
                "Clear and concise professional summary",
                "Relevant technical skills section",
                "Well-structured work experience"
            ],
            weaknesses: [
                "Missing keywords for your target industry",
                "Education section could be more detailed",
                "No certifications or professional development listed",
                "Limited use of industry-specific terminology"
            ],
            suggestions: [
                "Add more industry-specific keywords (e.g., 'Agile', 'Scrum', 'CI/CD')",
                "Include relevant certifications or online courses",
                "Expand on your most recent role with more achievements",
                "Add a skills section with both technical and soft skills",
                "Consider adding a projects or portfolio section",
                "Use more specific metrics and numbers to quantify impact"
            ]
        },
        keywords: {
            found: [
                "JavaScript",
                "React",
                "Node.js",
                "Team Leadership",
                "Project Management",
                "Problem Solving"
            ],
            missing: [
                "TypeScript",
                "AWS",
                "Docker",
                "Kubernetes",
                "Microservices",
                "Agile/Scrum"
            ]
        },
        formatting: {
            score: 85,
            issues: [
                "Consider using bullet points instead of paragraphs",
                "Ensure consistent date formatting throughout"
            ]
        }
    };

    res.json(sampleResult);
});

export default router;
