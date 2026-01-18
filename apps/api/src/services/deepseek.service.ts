import axios from 'axios';

export class DeepSeekService {
    private get apiKey(): string {
        return process.env.DEEPSEEK_API_KEY || '';
    }

    private baseUrl: string = 'https://api.deepseek.com/v1'; // Adjust API URL as needed

    constructor() {
        if (!process.env.DEEPSEEK_API_KEY) {
            // Log warning but don't crash, the key might be loaded later or this service unused
            // console.warn('⚠️ DEEPSEEK_API_KEY is not set (at init time).'); 
        }
    }

    /**
     * Send chat messages to DeepSeek
     */
    async chat(messages: { role: string; content: string }[], systemPrompt?: string, jsonMode: boolean = false): Promise<string> {
        try {
            const allMessages = systemPrompt
                ? [{ role: 'system', content: systemPrompt }, ...messages]
                : messages;

            const response = await axios.post(
                `${this.baseUrl}/chat/completions`,
                {
                    model: 'deepseek-chat',
                    messages: allMessages,
                    response_format: jsonMode ? { type: 'json_object' } : undefined
                },
                {
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            return response.data.choices[0].message.content;
        } catch (error: any) {
            console.error('DeepSeek Chat Error:', error.response?.data || error.message);
            // Fallback for demo/development if key fails
            if (process.env.NODE_ENV === 'development') {
                return "I apologize, but I'm having trouble connecting to my neural network right now. Let's continue with the scheduled questions.";
            }
            throw error;
        }
    }

    /**
     * Analyze JD to extract key info
     */
    async analyzeJD(jdText: string): Promise<any> {
        const systemPrompt = `Analyze the Job Description. Return JSON: { 
            "role": "string", 
            "techStack": ["string"], 
            "skills": ["string"], 
            "isDeveloper": boolean 
        }`;

        try {
            const content = await this.chat([{ role: 'user', content: jdText }], systemPrompt, true);
            return JSON.parse(content);
        } catch (error) {
            console.error('JD Analysis Failed:', error);
            return {
                role: "Candidate",
                techStack: [],
                skills: [],
                isDeveloper: true
            };
        }
    }

    /**
     * Generate final interview report
     */
    async generateFinalReport(jdInfo: any, sessionData: any[]): Promise<any> {
        const systemPrompt = `Generate a rigorous technical interview report based on the provided session data. 
        Role: ${jdInfo.role}
        Tech Stack: ${jdInfo.techStack.join(', ')}
        
        Return JSON: {
            "score": number (0-100),
            "summary": "string",
            "strengths": ["string"],
            "weaknesses": ["string"],
            "recommendation": "Strong Hire" | "Hire" | "No Hire"
        }`;

        try {
            const content = await this.chat(
                [{ role: 'user', content: JSON.stringify(sessionData) }],
                systemPrompt,
                true
            );
            return JSON.parse(content);
        } catch (error) {
            return {
                score: 0,
                summary: "Failed to generate report.",
                strengths: [],
                weaknesses: [],
                recommendation: "No Hire"
            };
        }
    }
}

export const deepseekService = new DeepSeekService();
