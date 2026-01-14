/**
 * DeepSeek AI Provider
 * Implements the AI provider interface for DeepSeek API
 */

export interface AIMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

export interface AIProviderResponse {
    content: string;
    usage?: {
        promptTokens: number;
        completionTokens: number;
        totalTokens: number;
    };
}

export class DeepSeekProvider {
    private apiKey: string;
    private baseUrl: string = 'https://api.deepseek.com';
    private model: string = 'deepseek-chat';

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    /**
     * Generate completion from DeepSeek
     */
    async generateCompletion(
        messages: AIMessage[],
        options?: { temperature?: number; maxTokens?: number }
    ): Promise<AIProviderResponse> {
        try {
            const response = await fetch(`${this.baseUrl}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: this.model,
                    messages,
                    stream: false,
                    temperature: options?.temperature ?? 0.7,
                    max_tokens: options?.maxTokens ?? 2000
                })
            });

            if (!response.ok) {
                const error = await response.text();
                throw new Error(`DeepSeek API error (${response.status}): ${error}`);
            }

            const data = await response.json();

            return {
                content: data.choices[0]?.message?.content || '',
                usage: {
                    promptTokens: data.usage?.prompt_tokens || 0,
                    completionTokens: data.usage?.completion_tokens || 0,
                    totalTokens: data.usage?.total_tokens || 0
                }
            };
        } catch (error: any) {
            console.error('❌ DeepSeek API Error:', error.message);
            throw new Error(`DeepSeek API failed: ${error.message}`);
        }
    }

    /**
     * Generate JSON response (parses JSON from completion)
     */
    async generateJSON<T = any>(
        systemPrompt: string,
        userPrompt: string,
        options?: { temperature?: number }
    ): Promise<T> {
        const messages: AIMessage[] = [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
        ];

        const response = await this.generateCompletion(messages, options);

        // Clean and parse JSON
        let cleaned = response.content.trim();
        cleaned = cleaned.replace(/^```json\n/, '').replace(/\n```$/, '');
        cleaned = cleaned.replace(/^```/, '').replace(/```$/, '');

        try {
            return JSON.parse(cleaned);
        } catch (error) {
            console.error('Failed to parse JSON response:', cleaned.substring(0, 200));
            throw new Error('Invalid JSON response from DeepSeek');
        }
    }

    /**
     * Health check
     */
    async healthCheck(): Promise<boolean> {
        try {
            await this.generateCompletion([
                { role: 'user', content: 'Hi' }
            ]);
            return true;
        } catch {
            return false;
        }
    }
}
