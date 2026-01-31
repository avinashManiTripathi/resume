import NodeCache from 'node-cache';
import crypto from 'crypto';
import { Readable } from 'stream';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';

/**
 * In-memory LRU cache for PDFs
 * - No external dependencies
 * - Automatic TTL expiration
 * - File system backup for persistence
 */

// In-memory cache: 1 hour TTL, check every 10 minutes
const pdfCache = new NodeCache({
    stdTTL: 3600,           // 1 hour default TTL
    checkperiod: 600,       // Check for expired keys every 10 minutes
    useClones: false,       // Don't clone buffers (performance)
    maxKeys: 500,           // Max 500 PDFs in memory (~50MB-500MB)
});

// Rate limit cache: 1 hour TTL
const rateLimitCache = new NodeCache({
    stdTTL: 3600,
    checkperiod: 600,
});

// File system cache directory
const CACHE_DIR = path.join(os.tmpdir(), 'pdf-cache');

// Initialize cache directory
const initCacheDir = async () => {
    try {
        await fs.mkdir(CACHE_DIR, { recursive: true });
    } catch (error) {
        console.error('Failed to create cache directory:', error);
    }
};

initCacheDir();

/**
 * Generate a cache key from resume data
 */
export const generatePdfCacheKey = (resumeData: any): string => {
    // Create deterministic hash from resume content
    const contentString = JSON.stringify({
        ...resumeData,
        // Exclude timestamp/metadata that doesn't affect PDF
        timestamp: undefined,
        userId: undefined
    });

    const hash = crypto
        .createHash('md5')
        .update(contentString)
        .digest('hex');

    return `pdf:${hash}`;
};

/**
 * Get cached PDF buffer from memory or disk
 */
export const getCachedPdf = async (cacheKey: string): Promise<Buffer | null> => {
    try {
        // 1. Try memory cache first
        const cached = pdfCache.get<Buffer>(cacheKey);
        if (cached) {
            console.log(`✅ PDF Cache HIT (memory): ${cacheKey}`);
            return cached;
        }

        // 2. Try file system cache
        const filePath = path.join(CACHE_DIR, `${cacheKey}.pdf`);
        try {
            const fileBuffer = await fs.readFile(filePath);
            console.log(`✅ PDF Cache HIT (disk): ${cacheKey}`);

            // Store back in memory for faster access next time
            pdfCache.set(cacheKey, fileBuffer);
            return fileBuffer;
        } catch {
            // File doesn't exist
        }

        console.log(`🔄 PDF Cache MISS: ${cacheKey}`);
        return null;
    } catch (error) {
        console.error('Cache get error:', error);
        return null;
    }
};

/**
 * Cache PDF buffer in memory and disk
 */
export const cachePdf = async (
    cacheKey: string,
    pdfBuffer: Buffer,
    ttlSeconds: number = 3600
): Promise<void> => {
    try {
        // 1. Store in memory
        pdfCache.set(cacheKey, pdfBuffer, ttlSeconds);

        // 2. Store on disk for persistence
        const filePath = path.join(CACHE_DIR, `${cacheKey}.pdf`);
        await fs.writeFile(filePath, pdfBuffer);

        console.log(`💾 PDF Cached (memory + disk): ${cacheKey} (TTL: ${ttlSeconds}s, Size: ${(pdfBuffer.length / 1024).toFixed(1)}KB)`);
    } catch (error) {
        console.error('Cache set error:', error);
        // Don't throw - caching failure shouldn't break PDF generation
    }
};

/**
 * Cache PDF stream by converting to buffer
 */
export const cachePdfStream = async (
    cacheKey: string,
    stream: Readable,
    ttlSeconds: number = 3600
): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
        const chunks: Buffer[] = [];

        stream.on('data', (chunk) => {
            chunks.push(Buffer.from(chunk));
        });

        stream.on('end', async () => {
            const buffer = Buffer.concat(chunks);
            await cachePdf(cacheKey, buffer, ttlSeconds);
            resolve(buffer);
        });

        stream.on('error', (error) => {
            console.error('Stream error during caching:', error);
            reject(error);
        });
    });
};

/**
 * Check rate limit for user (in-memory)
 */
export const checkDownloadRateLimit = async (
    userId: string,
    maxDownloads: number = 10,
    windowSeconds: number = 3600
): Promise<{ allowed: boolean; remaining: number; resetAt: number }> => {
    const key = `ratelimit:download:${userId}`;

    try {
        const data = rateLimitCache.get<{ count: number; startTime: number }>(key);
        const now = Date.now();

        if (!data) {
            // First request in window
            rateLimitCache.set(key, { count: 1, startTime: now }, windowSeconds);

            return {
                allowed: true,
                remaining: maxDownloads - 1,
                resetAt: now + (windowSeconds * 1000)
            };
        }

        // Increment count
        const newCount = data.count + 1;
        rateLimitCache.set(key, { count: newCount, startTime: data.startTime }, windowSeconds);

        const resetAt = data.startTime + (windowSeconds * 1000);
        const remaining = Math.max(0, maxDownloads - newCount);

        if (newCount > maxDownloads) {
            console.log(`⛔ Rate limit exceeded for user ${userId}: ${newCount}/${maxDownloads}`);
            return {
                allowed: false,
                remaining: 0,
                resetAt
            };
        }

        console.log(`✅ Rate limit OK for user ${userId}: ${newCount}/${maxDownloads}, ${remaining} remaining`);
        return {
            allowed: true,
            remaining,
            resetAt
        };
    } catch (error) {
        console.error('Rate limit error:', error);
        // Fail open - allow request if cache fails
        return {
            allowed: true,
            remaining: maxDownloads,
            resetAt: Date.now() + windowSeconds * 1000
        };
    }
};

/**
 * Get cache statistics
 */
export const getCacheStats = async (): Promise<{
    pdfCount: number;
    memoryUsage: string;
    hitRate: string;
}> => {
    try {
        const stats = pdfCache.getStats();
        const keys = pdfCache.keys();

        // Calculate approximate memory usage
        let totalSize = 0;
        keys.forEach(key => {
            const buffer = pdfCache.get<Buffer>(key);
            if (buffer) totalSize += buffer.length;
        });

        const memoryMB = (totalSize / 1024 / 1024).toFixed(2);
        const hitRate = stats.hits > 0
            ? (stats.hits / (stats.hits + stats.misses) * 100).toFixed(1)
            : '0';

        return {
            pdfCount: keys.length,
            memoryUsage: `${memoryMB} MB`,
            hitRate: `${hitRate}%`
        };
    } catch (error) {
        console.error('Cache stats error:', error);
        return {
            pdfCount: 0,
            memoryUsage: '0 MB',
            hitRate: '0%'
        };
    }
};

/**
 * Clear old cache files from disk
 */
export const cleanupDiskCache = async (maxAgeHours: number = 24): Promise<void> => {
    try {
        const files = await fs.readdir(CACHE_DIR);
        const now = Date.now();
        const maxAge = maxAgeHours * 60 * 60 * 1000;

        let deleted = 0;
        for (const file of files) {
            const filePath = path.join(CACHE_DIR, file);
            const stats = await fs.stat(filePath);

            if (now - stats.mtimeMs > maxAge) {
                await fs.unlink(filePath);
                deleted++;
            }
        }

        if (deleted > 0) {
            console.log(`🧹 Cleaned up ${deleted} old cache files`);
        }
    } catch (error) {
        console.error('Disk cleanup error:', error);
    }
};

// Auto cleanup every 6 hours
setInterval(() => cleanupDiskCache(24), 6 * 60 * 60 * 1000);

// Log cache stats every 10 minutes
setInterval(async () => {
    const stats = await getCacheStats();
    console.log(`📊 Cache Stats: ${stats.pdfCount} PDFs, ${stats.memoryUsage}, Hit Rate: ${stats.hitRate}`);
}, 10 * 60 * 1000);
