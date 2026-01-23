import { Server, Socket } from 'socket.io';
import { deepseekService } from '../services/deepseek.service';
import { InterviewSession } from '../models/InterviewSession';

interface SessionData {
    name: string;
    role: string;
    sessionId?: string;
    history: { role: 'user' | 'assistant'; content: string; timestamp: string }[];
}

const sessions = new Map<string, SessionData>();

export function setupInterviewSocket(io: Server) {
    const interviewNamespace = io.of('/'); // Using default namespace for simplicity

    interviewNamespace.on('connection', (socket: Socket) => {
        console.log(`🔌 Client connected: ${socket.id}`);

        socket.on('start-interview', async (data: { name: string; role: string; sessionId?: string }) => {
            console.log(`🎬 Starting interview for ${data.name} as ${data.role}`);

            let sessionHistory: SessionData['history'] = [];

            // Recover history from DB if sessionId provided
            if (data.sessionId) {
                try {
                    const dbSession = await InterviewSession.findById(data.sessionId);
                    if (dbSession && dbSession.history && dbSession.history.length > 0) {
                        console.log(`📖 Recovered ${dbSession.history.length} messages from DB session ${data.sessionId}`);
                        // Map DB history to socket history format
                        sessionHistory = dbSession.history.map(h => ({
                            role: h.role === 'interviewer' ? 'assistant' : 'candidate' as any, // Map 'interviewer' -> 'assistant', 'candidate' -> 'user'
                            content: h.content,
                            timestamp: h.timestamp ? h.timestamp.toISOString() : new Date().toISOString()
                        })).map(h => ({
                            role: h.role === 'assistant' ? 'assistant' : 'user',
                            content: h.content,
                            timestamp: h.timestamp
                        }));

                        // Send history to client to restore UI
                        socket.emit('history', sessionHistory);
                    }
                } catch (err) {
                    console.error('Failed to fetch session history:', err);
                }
            }

            sessions.set(socket.id, {
                name: data.name,
                role: data.role,
                sessionId: data.sessionId,
                history: sessionHistory
            });

            // Only trigger AI greeting if history is empty
            if (sessionHistory.length === 0) {
                // Standard opening question - always start with self introduction
                const greeting = `Hello ${data.name}! I'm Hirecta AI, your technical interviewer for this ${data.role} position. I'm excited to learn more about your background and experience. Let's begin with a fundamental question: Tell me about yourself.`;

                const message = {
                    content: greeting,
                    timestamp: new Date().toISOString()
                };

                // Save to in-memory history
                const session = sessions.get(socket.id);
                if (session) {
                    session.history.push({ role: 'assistant', content: greeting, timestamp: message.timestamp });

                    // Save to DB
                    if (session.sessionId) {
                        await InterviewSession.findByIdAndUpdate(session.sessionId, {
                            $push: {
                                history: {
                                    role: 'interviewer',
                                    content: greeting,
                                    timestamp: new Date()
                                }
                            }
                        });
                    }
                }

                socket.emit('message', message);
            } else {
                console.log('Skipping greeting, history exists.');
            }
        });

        socket.on('send-message', async (data: { content: string }) => {
            const session = sessions.get(socket.id);
            if (!session) return;

            const timestamp = new Date().toISOString();

            // Add user message to history
            session.history.push({
                role: 'user',
                content: data.content,
                timestamp: timestamp
            });

            // Save to DB
            if (session.sessionId) {
                await InterviewSession.findByIdAndUpdate(session.sessionId, {
                    $push: {
                        history: {
                            role: 'candidate',
                            content: data.content,
                            timestamp: new Date()
                        }
                    }
                });
            }

            try {
                // Fetch full session from DB to get JD info
                let jdContext = '';
                if (session.sessionId) {
                    const dbSession = await InterviewSession.findById(session.sessionId);
                    if (dbSession && dbSession.jdInfo) {
                        const jdInfo = dbSession.jdInfo;
                        jdContext = `
Job Role: ${jdInfo.role || session.role}
Required Skills: ${jdInfo.skills?.join(', ') || 'Not specified'}
Tech Stack: ${jdInfo.techStack?.join(', ') || 'Not specified'}
Experience Level: ${jdInfo.experienceLevel || 'Not specified'}
Is Developer Role: ${jdInfo.isDeveloper ? 'Yes' : 'No'}`;
                    }
                }

                // Enhanced AI prompt with JD context
                const systemPrompt = `You are conducting a professional technical interview for ${session.name} for a ${session.role} position.

${jdContext}

INTERVIEW GUIDELINES:
1. First question should always be "Tell me about yourself" (if this is their first response)
2. Ask technical questions relevant to the job requirements and tech stack mentioned above
3. For developer roles, include coding and system design questions
4. Evaluate their previous answer before asking the next question
5. Ask follow-up questions based on their responses
6. Keep questions professional, clear, and challenging
7. Progress naturally through: intro → technical skills → coding (if developer) → behavioral → wrap-up

Current conversation context: Review their previous answers and ask the next logical question.`;

                // Convert history to format expected by service
                const contextMessages = session.history.map(h => ({
                    role: h.role, // 'user' | 'assistant'
                    content: h.content
                }));

                const response = await deepseekService.chat(contextMessages, systemPrompt);

                const aiMessage = {
                    content: response,
                    timestamp: new Date().toISOString()
                };

                session.history.push({
                    role: 'assistant',
                    content: response,
                    timestamp: aiMessage.timestamp
                });

                // Save to DB
                if (session.sessionId) {
                    await InterviewSession.findByIdAndUpdate(session.sessionId, {
                        $push: {
                            history: {
                                role: 'interviewer',
                                content: response,
                                timestamp: new Date()
                            }
                        }
                    });
                }

                socket.emit('message', aiMessage);

            } catch (error) {
                console.error('Error in chat loop:', error);
                socket.emit('error', { message: 'Failed to process response.' });
            }
        });

        socket.on('disconnect', () => {
            console.log(`❌ Client disconnected: ${socket.id}`);
            sessions.delete(socket.id);
        });
    });
}
