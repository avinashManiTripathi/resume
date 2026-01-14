import { Router, Response } from 'express';
import { verifyToken, AuthRequest } from '../middleware/auth.middleware';
import { InterviewSession } from '../models';
import * as interviewService from '../services/interview.service';

const router = Router();

/**
 * START Interview
 * PUBLIC ENDPOINT - No auth required for testing
 */
router.post('/start', async (req: any, res: Response) => {
    try {
        const { jobDescription } = req.body;
        console.log('Job Description:', jobDescription);

        // Try to get userId from auth if available, otherwise use 'guest'
        const userId = req.user?.userId || 'guest';

        if (!jobDescription) {
            return res.status(400).json({ success: false, message: 'Job Description is required' });
        }

        // 1. Analyze JD
        const jdInfo = await interviewService.analyzeJD(jobDescription);

        // 2. Generate ALL interview questions upfront (BATCH MODE)
        console.log('📝 Generating all questions in batch mode...');
        const allQuestions = await interviewService.generateAllQuestions(jdInfo);
        console.log(`✅ Generated ${allQuestions.length} questions total`);

        // 3. Create Session with pre-generated questions
        const session = new InterviewSession({
            userId,
            jobDescription,
            jdInfo,
            status: 'active',
            currentPhase: 'intro',
            currentQuestionIndex: 0,
            allQuestions,  // Store all questions
            history: []
        });

        // 4. Start with first pre-generated question
        const firstQuestion = allQuestions[0];
        session.history.push({
            role: 'interviewer',
            content: firstQuestion.question,
            metadata: {
                type: firstQuestion.type,
                expectedPoints: firstQuestion.expectedPoints
            }
        });
        session.currentQuestionIndex = 1;  // Move to next question

        await session.save();

        res.json({ success: true, data: session });
    } catch (error: any) {
        console.error('Interview Start Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

/**
 * POST Answer and get next question
 * PUBLIC ENDPOINT - No auth required for testing
 */
router.post('/answer', async (req: any, res: Response) => {
    try {
        const { sessionId, answer } = req.body;
        const session = await InterviewSession.findById(sessionId);

        if (!session || session.status === 'completed') {
            return res.status(404).json({ success: false, message: 'Active session not found' });
        }

        // CRITICAL FIX: Ensure the last message is an interviewer question
        // This prevents duplicate answer submissions
        const lastMessage = session.history[session.history.length - 1];
        if (!lastMessage || lastMessage.role !== 'interviewer') {
            return res.status(400).json({
                success: false,
                message: 'No question waiting for answer. Please refresh the session.'
            });
        }

        // 1. Store answer without evaluation (batch mode)
        const lastQuestion = lastMessage;
        session.history.push({
            role: 'candidate',
            content: answer,
            metadata: {
                questionIndex: (session.currentQuestionIndex || 1) - 1,
                expectedPoints: lastQuestion.metadata?.expectedPoints || []
            }
        });

        // 2. Check if we have more questions
        const totalQuestions = session.allQuestions?.length || 0;
        const nextIndex = session.currentQuestionIndex || 0;

        if (nextIndex >= totalQuestions) {
            // Interview complete - BATCH EVALUATE ALL ANSWERS
            console.log('🎯 Interview complete! Batch evaluating all answers...');

            // Extract Q&A pairs for batch evaluation
            const qaPairs = [];
            for (let i = 0; i < session.history.length; i++) {
                const msg = session.history[i];
                if (msg.role === 'candidate') {
                    const prevQuestion = session.history[i - 1];
                    if (prevQuestion && prevQuestion.role === 'interviewer') {
                        qaPairs.push({
                            question: prevQuestion.content,
                            answer: msg.content,
                            expectedPoints: msg.metadata?.expectedPoints || []
                        });
                    }
                }
            }

            // Batch evaluate all answers at once
            const evaluations = await interviewService.batchEvaluateAnswers(qaPairs);

            // Attach evaluations to candidate answers
            let evalIdx = 0;
            for (let i = 0; i < session.history.length; i++) {
                if (session.history[i].role === 'candidate') {
                    session.history[i].evaluation = evaluations[evalIdx++];
                }
            }

            // Generate final report
            session.status = 'completed';
            session.finalReport = await interviewService.generateFinalReport(
                session.jdInfo,
                session.history
            );
            await session.save();

            console.log('✅ Interview completed with batch evaluation!');
            return res.json({ success: true, data: session, finished: true });
        }

        // 3. Get next pre-generated question (NO AI CALL!)
        if (!session.allQuestions) {
            return res.status(500).json({ success: false, message: 'No questions in session' });
        }
        const nextQ = session.allQuestions[nextIndex];
        if (!nextQ) {
            return res.status(500).json({ success: false, message: 'Question not found' });
        }
        session.currentQuestionIndex = nextIndex + 1;

        // Update phase based on question type (with type safety)
        if (nextQ.type) {
            session.currentPhase = nextQ.type as any;
        }

        session.history.push({
            role: 'interviewer',
            content: nextQ.question,
            metadata: {
                type: nextQ.type,
                expectedPoints: nextQ.expectedPoints
            }
        });

        console.log(`📝 Serving pre-generated question ${nextIndex + 1}/${totalQuestions}`);


        await session.save();
        res.json({ success: true, data: session });
    } catch (error: any) {
        console.error('Interview Answer Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

/**
 * GET Session Status
 * PUBLIC ENDPOINT - No auth required for testing
 */
router.get('/:id', async (req: any, res: Response) => {
    try {
        const session = await InterviewSession.findById(req.params.id);
        res.json({ success: true, data: session });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
