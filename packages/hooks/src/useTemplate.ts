import { useRef, useCallback } from 'react';
import { useGet } from './network';

/**
 * Template interface matching the API response
 */
export interface Template {
    _id: string;
    name: string;
    html: string;
    image?: string;
    description?: string;
    category?: string;
    isPremium?: boolean;
    // Additional properties from API
    thumbnail?: string;
    htmlContent?: string;
    type?: string;
    isActive?: boolean;
}

/**
 * Cache entry with timestamp for TTL
 */
interface CacheEntry<T> {
    data: T;
    timestamp: number;
}

/**
 * Simple in-memory cache with TTL
 */
class TemplateCache {
    private cache: Map<string, CacheEntry<any>> = new Map();
    private defaultTTL: number = 5 * 60 * 1000; // 5 minutes

    set<T>(key: string, data: T, ttl?: number): void {
        this.cache.set(key, {
            data,
            timestamp: Date.now(),
        });
    }

    get<T>(key: string, ttl?: number): T | null {
        const entry = this.cache.get(key);
        if (!entry) return null;

        const age = Date.now() - entry.timestamp;
        const maxAge = ttl || this.defaultTTL;

        if (age > maxAge) {
            this.cache.delete(key);
            return null;
        }

        return entry.data as T;
    }

    clear(key?: string): void {
        if (key) {
            this.cache.delete(key);
        } else {
            this.cache.clear();
        }
    }

    has(key: string, ttl?: number): boolean {
        return this.get(key, ttl) !== null;
    }
}

// Global cache instance
const templateCache = new TemplateCache();

/**
 * useTemplates - Hook to fetch all resume templates with caching
 * 
 * @param options - Configuration options
 * @param options.apiUrl - Base API URL (optional, defaults to environment variable)
 * @param options.cacheTTL - Cache time-to-live in milliseconds (default: 5 minutes)
 * @param options.skipCache - Skip cache and force fresh fetch
 * @returns Object with templates array, loading state, error, and refetch function
 * 
 * @example
 * const { templates, loading, error, refetch, clearCache } = useTemplates();
 * 
 * // With custom cache TTL (10 minutes)
 * const { templates } = useTemplates({ cacheTTL: 10 * 60 * 1000 });
 * 
 * // Skip cache for fresh data
 * const { templates } = useTemplates({ skipCache: true });
 */
export function useTemplates(options?: {
    apiUrl?: string;
    cacheTTL?: number;
    skipCache?: boolean;
}) {
    const { apiUrl, cacheTTL, skipCache } = options || {};
    const baseUrl = apiUrl || process.env.NEXT_PUBLIC_API_URL || 'https://api.profresume.com';
    const endpoint = `${baseUrl}/api/templates`;
    const cacheKey = 'templates:all';

    // Check cache first
    const cachedData = skipCache ? null : templateCache.get<{
        templates: Template[];
        count: number;
    }>(cacheKey, cacheTTL);
    const shouldFetch = !cachedData;

    const { data, loading, error, refetch } = useGet<{ templates: Template[]; count: number }>(endpoint, {
        skip: !shouldFetch,
    });

    // Cache the data when fetched
    const dataRef = useRef(data);
    if (data && data !== dataRef.current) {
        templateCache.set(cacheKey, data, cacheTTL);
        dataRef.current = data;
    }

    const clearCache = useCallback(() => {
        templateCache.clear(cacheKey);
    }, [cacheKey]);

    const refetchFresh = useCallback(() => {
        templateCache.clear(cacheKey);
        return refetch();
    }, [cacheKey, refetch]);

    console.log({ cachedData, data })

    return {
        templates: cachedData?.templates || data?.templates,
        loading: shouldFetch ? loading : false,
        error,
        refetch: refetchFresh,
        clearCache,
        isCached: !!cachedData,
    };
}

/**
 * useTemplate - Hook to fetch a single template by ID with caching
 * 
 * @param templateId - The ID of the template to fetch
 * @param options - Configuration options
 * @returns Object with template, loading state, error, and refetch function
 * 
 * @example
 * const { template, loading, error, isCached } = useTemplate('template-123');
 */
export function useTemplate(
    templateId: string,
    options?: {
        apiUrl?: string;
        cacheTTL?: number;
        skipCache?: boolean;
    }
) {
    const { apiUrl, cacheTTL, skipCache } = options || {};
    const baseUrl = apiUrl || process.env.NEXT_PUBLIC_API_URL || 'https://api.profresume.com';
    const endpoint = `${baseUrl}/templates/${templateId}`;
    const cacheKey = `template:${templateId}`;

    // Check cache first
    const cachedData = skipCache ? null : templateCache.get<Template>(cacheKey, cacheTTL);
    const shouldFetch = !cachedData && !!templateId;

    const { data, loading, error, refetch } = useGet<Template>(endpoint, {
        skip: !shouldFetch,
    });

    // Cache the data when fetched
    const dataRef = useRef(data);
    if (data && data !== dataRef.current) {
        templateCache.set(cacheKey, data, cacheTTL);
        dataRef.current = data;
    }

    const clearCache = useCallback(() => {
        templateCache.clear(cacheKey);
    }, [cacheKey]);

    const refetchFresh = useCallback(() => {
        templateCache.clear(cacheKey);
        return refetch();
    }, [cacheKey, refetch]);

    return {
        template: cachedData || data,
        loading: shouldFetch ? loading : false,
        error,
        refetch: refetchFresh,
        clearCache,
        isCached: !!cachedData,
    };
}

/**
 * useTemplatesByCategory - Hook to fetch templates filtered by category with caching
 * 
 * @param category - Category to filter by
 * @param options - Configuration options
 * @returns Object with templates array, loading state, error, and refetch function
 * 
 * @example
 * const { templates, loading, isCached } = useTemplatesByCategory('professional');
 */
export function useTemplatesByCategory(
    category: string,
    options?: {
        apiUrl?: string;
        cacheTTL?: number;
        skipCache?: boolean;
    }
) {
    const { apiUrl, cacheTTL, skipCache } = options || {};
    const baseUrl = apiUrl || process.env.NEXT_PUBLIC_API_URL || 'https://api.profresume.com';
    const endpoint = `${baseUrl}/templates?category=${encodeURIComponent(category)}`;
    const cacheKey = `templates:category:${category}`;

    // Check cache first
    const cachedData = skipCache ? null : templateCache.get<Template[]>(cacheKey, cacheTTL);
    const shouldFetch = !cachedData && !!category;

    const { data, loading, error, refetch } = useGet<Template[]>(endpoint, {
        skip: !shouldFetch,
    });

    // Cache the data when fetched
    const dataRef = useRef(data);
    if (data && data !== dataRef.current) {
        templateCache.set(cacheKey, data, cacheTTL);
        dataRef.current = data;
    }

    const clearCache = useCallback(() => {
        templateCache.clear(cacheKey);
    }, [cacheKey]);

    const refetchFresh = useCallback(() => {
        templateCache.clear(cacheKey);
        return refetch();
    }, [cacheKey, refetch]);

    return {
        templates: cachedData || data,
        loading: shouldFetch ? loading : false,
        error,
        refetch: refetchFresh,
        clearCache,
        isCached: !!cachedData,
    };
}

/**
 * clearAllTemplateCache - Clear all template cache entries
 * 
 * @example
 * clearAllTemplateCache();
 */
export function clearAllTemplateCache(): void {
    templateCache.clear();
}
