import NodeCache from 'node-cache';
import crypto from 'crypto';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';

/**
 * AI Analysis Cache Service
 * Caches expensive AI API responses to reduce costs and latency
 */

// In-memory cache: 24 hour TTL
const aiCache = new NodeCache({
    stdTTL: 86400,          // 24 hours
    checkperiod: 3600,      // Check every hour
    useClones: false,
    maxKeys: 1000,          // Max 1000 items in memory
});

// File system cache directory
const CACHE_DIR = path.join(os.tmpdir(), 'ai-cache');

// Initialize cache directory
const initCacheDir = async () => {
    try {
        await fs.mkdir(CACHE_DIR, { recursive: true });
    } catch (error) {
        console.error('Failed to create AI cache directory:', error);
    }
};

initCacheDir();

/**
 * Generate a deterministic cache key from input data
 */
export const generateAICacheKey = (data: any): string => {
    // Sort keys to ensure deterministic order
    const stableStringify = (obj: any): string => {
        if (typeof obj !== 'object' || obj === null) {
            return String(obj);
        }

        if (Array.isArray(obj)) {
            return JSON.stringify(obj.map(stableStringify));
        }

        const sortedKeys = Object.keys(obj).sort();
        const result: Record<string, any> = {};
        sortedKeys.forEach(key => {
            result[key] = obj[key];
        });

        return JSON.stringify(result);
    };

    const contentString = stableStringify(data);

    const hash = crypto
        .createHash('md5')
        .update(contentString)
        .digest('hex');

    return `ai:${hash}`;
};

/**
 * Get cached analysis from memory or disk
 */
export const getCachedAnalysis = async (cacheKey: string): Promise<any | null> => {
    try {
        // 1. Try memory cache first
        const cached = aiCache.get<any>(cacheKey);
        if (cached) {
            console.log(`✅ AI Cache HIT (memory): ${cacheKey}`);
            return cached;
        }

        // 2. Try file system cache
        const filePath = path.join(CACHE_DIR, `${cacheKey}.json`);
        try {
            const fileContent = await fs.readFile(filePath, 'utf-8');
            const data = JSON.parse(fileContent);
            console.log(`✅ AI Cache HIT (disk): ${cacheKey}`);

            // Store back in memory
            aiCache.set(cacheKey, data);
            return data;
        } catch {
            // File doesn't exist
        }

        console.log(`🔄 AI Cache MISS: ${cacheKey}`);
        return null;
    } catch (error) {
        console.error('AI Cache get error:', error);
        return null;
    }
};

/**
 * Cache analysis result
 */
export const cacheAnalysis = async (
    cacheKey: string,
    data: any,
    ttlSeconds: number = 86400
): Promise<void> => {
    try {
        // 1. Store in memory
        aiCache.set(cacheKey, data, ttlSeconds);

        // 2. Store on disk
        const filePath = path.join(CACHE_DIR, `${cacheKey}.json`);
        await fs.writeFile(filePath, JSON.stringify(data));

        console.log(`💾 AI Value Cached: ${cacheKey}`);
    } catch (error) {
        console.error('AI Cache set error:', error);
    }
};

/**
 * Clear old cache files
 */
export const cleanupAICache = async (maxAgeHours: number = 48): Promise<void> => {
    try {
        const files = await fs.readdir(CACHE_DIR);
        const now = Date.now();
        const maxAge = maxAgeHours * 60 * 60 * 1000;

        let deleted = 0;
        for (const file of files) {
            if (!file.endsWith('.json')) continue;

            const filePath = path.join(CACHE_DIR, file);
            const stats = await fs.stat(filePath);

            if (now - stats.mtimeMs > maxAge) {
                await fs.unlink(filePath);
                deleted++;
            }
        }

        if (deleted > 0) {
            console.log(`🧹 Cleaned up ${deleted} old AI cache files`);
        }
    } catch (error) {
        console.error('AI Disk cleanup error:', error);
    }
};

// Auto cleanup every 12 hours
setInterval(() => cleanupAICache(48), 12 * 60 * 60 * 1000);
