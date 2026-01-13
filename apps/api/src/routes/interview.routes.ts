import { Router, Response } from 'express';
import { verifyToken, AuthRequest } from '../middleware/auth.middleware';
import { InterviewSession } from '../models';
import * as interviewService from '../services/interview.service';

const router = Router();

/**
 * START Interview
 */
router.post('/start', verifyToken, async (req: any, res: Response) => {
    try {
        const authReq = req as AuthRequest;
        const { jobDescription } = authReq.body;
        const userId = authReq.user?.userId;

        if (!jobDescription) {
            return res.status(400).json({ success: false, message: 'Job Description is required' });
        }

        // Analyze JD
        const jdInfo = await interviewService.analyzeJD(jobDescription);

        // Create Session
        const session = new InterviewSession({
            userId,
            jobDescription,
            jdInfo,
            status: 'active',
            currentPhase: 'intro',
            history: []
        });

        // Generate first question (ALWAYS the fixed introduction question)
        const firstQuestion = interviewService.getIntroductionQuestion();

        session.history.push({
            role: 'interviewer',
            content: firstQuestion.question,
            metadata: { context: firstQuestion.context, expectedPoints: firstQuestion.expectedPoints }
        });

        await session.save();

        res.json({ success: true, data: session });
    } catch (error: any) {
        console.error('Interview Start Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

/**
 * POST Answer and get next question
 */
router.post('/answer', verifyToken, async (req: any, res: Response) => {
    try {
        const authReq = req as AuthRequest;
        const { sessionId, answer } = authReq.body;
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

        // 1. Evaluate current answer
        const lastQuestion = lastMessage;
        const evaluation = await interviewService.evaluateAnswer(
            lastQuestion.content,
            answer,
            lastQuestion.metadata?.expectedPoints || []
        );

        session.history.push({
            role: 'candidate',
            content: answer,
            evaluation
        });

        // 2. Decide next phase or question
        // Updated logic: variable question count based on isDeveloper flag
        const count = session.history.filter(h => h.role === 'candidate').length;
        const isDeveloper = session.jdInfo?.isDeveloper || false;

        // Phase progression logic:
        // Questions 1-2: intro
        // Questions 3-8: technical
        // Questions 9-13: coding (ONLY if isDeveloper)
        // Questions 14-15 (or 9-10 if not developer): behavioral

        if (count === 2) session.currentPhase = 'technical';

        if (isDeveloper) {
            // Developer path: includes coding round
            if (count === 8) session.currentPhase = 'coding';
            if (count === 13) session.currentPhase = 'behavioral';
            if (count >= 15) {
                session.status = 'completed';
                session.finalReport = await interviewService.generateFinalReport(session.jdInfo, session.history);
                await session.save();
                return res.json({ success: true, data: session, finished: true });
            }
        } else {
            // Non-developer path: skip coding, go straight to behavioral
            if (count === 8) session.currentPhase = 'behavioral';
            if (count >= 10) {
                session.status = 'completed';
                session.finalReport = await interviewService.generateFinalReport(session.jdInfo, session.history);
                await session.save();
                return res.json({ success: true, data: session, finished: true });
            }
        }

        // 3. Generate Next Question
        const nextQ = await interviewService.generateQuestion(
            session.jdInfo,
            session.history.map(h => ({ role: h.role, content: h.content })),
            session.currentPhase as any
        );

        session.history.push({
            role: 'interviewer',
            content: nextQ.question,
            metadata: { context: nextQ.context, expectedPoints: nextQ.expectedPoints }
        });

        await session.save();
        res.json({ success: true, data: session });
    } catch (error: any) {
        console.error('Interview Answer Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

/**
 * GET Session Status
 */
router.get('/:id', verifyToken, async (req: any, res: Response) => {
    try {
        const session = await InterviewSession.findById(req.params.id);
        res.json({ success: true, data: session });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
