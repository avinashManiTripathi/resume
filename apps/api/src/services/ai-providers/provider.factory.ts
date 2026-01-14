/**
 * AI Provider Factory
 * Centralized factory for creating AI provider instances based on configuration
 */

import { DeepSeekProvider } from './deepseek.provider';
import { GoogleGenAI } from '@google/genai';

export type AIProviderType = 'deepseek' | 'gemini' | 'local-api';

export interface IAIProvider {
    generateCompletion(messages: any[], options?: any): Promise<any>;
    generateJSON<T>(systemPrompt: string, userPrompt: string, options?: any): Promise<T>;
    healthCheck(): Promise<boolean>;
}

/**
 * Gemini Provider Wrapper (wraps existing GoogleGenAI)
 */
class GeminiProvider implements IAIProvider {
    private client: any;
    private model: string = 'gemini-2.0-flash-exp';

    constructor(apiKey: string) {
        this.client = new GoogleGenAI({ apiKey });
    }

    async generateCompletion(messages: any[], options?: any): Promise<any> {
        const prompt = messages.map((m: any) => `${m.role}: ${m.content}`).join('\n');
        const response = await this.client.models.generateContent({
            model: this.model,
            contents: prompt
        });
        return {
            content: response.text || '',
            usage: {}
        };
    }

    async generateJSON<T>(systemPrompt: string, userPrompt: string, options?: any): Promise<T> {
        const prompt = `${systemPrompt}\n\n${userPrompt}`;
        const response = await this.client.models.generateContent({
            model: this.model,
            contents: prompt
        });

        let text = response.text.trim();
        text = text.replace(/^```json\n/, '').replace(/\n```$/, '');
        text = text.replace(/^```/, '').replace(/```$/, '');

        return JSON.parse(text);
    }

    async healthCheck(): Promise<boolean> {
        try {
            await this.generateCompletion([{ role: 'user', content: 'test' }]);
            return true;
        } catch {
            return false;
        }
    }
}

/**
 * Local AI-API Provider (connects to your Python API)
 */
class LocalAPIProvider implements IAIProvider {
    private baseUrl: string;

    constructor(baseUrl: string = 'http://localhost:8000') {
        this.baseUrl = baseUrl;
    }

    async generateCompletion(messages: any[], options?: any): Promise<any> {
        // Convert messages to prompt
        const prompt = messages.filter((m: any) => m.role === 'user')
            .map((m: any) => m.content).join('\n');

        const response = await fetch(`${this.baseUrl}/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                prompt,
                num_questions: options?.num_questions || 5
            })
        });

        if (!response.ok) {
            throw new Error(`Local API error: ${response.statusText}`);
        }

        const data = await response.json();
        return {
            content: JSON.stringify(data.qa_pairs),
            usage: {}
        };
    }

    async generateJSON<T>(systemPrompt: string, userPrompt: string, options?: any): Promise<T> {
        const response = await this.generateCompletion([
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
        ], options);

        return JSON.parse(response.content);
    }

    async healthCheck(): Promise<boolean> {
        try {
            const response = await fetch(`${this.baseUrl}/health`);
            return response.ok;
        } catch {
            return false;
        }
    }
}

/**
 * Provider Factory
 */
export class AIProviderFactory {
    private static instance: IAIProvider | null = null;
    private static providerType: AIProviderType | null = null;

    /**
     * Get or create AI provider instance
     */
    static getProvider(
        type: AIProviderType = 'deepseek',
        config?: { apiKey?: string; baseUrl?: string }
    ): IAIProvider {
        // Return cached instance if same type
        if (this.instance && this.providerType === type) {
            return this.instance;
        }

        // Create new provider based on type
        switch (type) {
            case 'deepseek':
                const deepseekKey = config?.apiKey || process.env.DEEPSEEK_API_KEY;
                if (!deepseekKey) {
                    throw new Error('DeepSeek API key not configured');
                }
                this.instance = new DeepSeekProvider(deepseekKey);
                break;

            case 'gemini':
                const geminiKey = config?.apiKey || process.env.GEMINI_API_KEY;
                if (!geminiKey) {
                    throw new Error('Gemini API key not configured');
                }
                this.instance = new GeminiProvider(geminiKey);
                break;

            case 'local-api':
                const baseUrl = config?.baseUrl || process.env.LOCAL_AI_API_URL || 'http://localhost:8000';
                this.instance = new LocalAPIProvider(baseUrl);
                break;

            default:
                throw new Error(`Unknown provider type: ${type}`);
        }

        this.providerType = type;
        console.log(`✅ AI Provider initialized: ${type}`);
        return this.instance;
    }

    /**
     * Get provider type from environment
     */
    static getProviderTypeFromEnv(): AIProviderType {
        const envType = process.env.AI_PROVIDER as AIProviderType;
        return envType || 'deepseek'; // Default to DeepSeek
    }
}
