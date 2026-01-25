import { useState, useEffect, useCallback, useRef } from 'react';
import { useNetwork } from '@repo/utils-client';

/**
 * Type definitions for network hooks
 */
export interface FetchState<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
}

export interface FetchOptions extends RequestInit {
    skip?: boolean;
}

export interface MutationState<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
    execute: (body?: any) => Promise<T | null>;
    reset: () => void;
}

/**
 * useFetch - Generic hook for fetching data using useNetwork
 */
export function useFetch<T = any>(
    url: string,
    options: FetchOptions = {}
): FetchState<T> & { refetch: () => void } {
    const { get, loading, error } = useNetwork();
    const [data, setData] = useState<T | null>(null);
    const [shouldFetch, setShouldFetch] = useState(!options.skip);

    const fetchData = useCallback(async () => {
        if (!shouldFetch && options.skip) return;

        try {
            const result = await get<T>(url, options);
            setData(result);
        } catch (err) {
            // Error is handled by useNetwork and set in error state
        }
    }, [url, options.skip, shouldFetch, get]); // Removed 'options' from deps to avoid loop if object literal passed

    useEffect(() => {
        if (!options.skip) {
            fetchData();
        }
    }, [fetchData, options.skip]);

    return {
        data,
        loading: loading && !data && !error, // Only loading if no data/error yet (or effectively re-fetching)
        error,
        refetch: fetchData,
    };
}

/**
 * useGet - Hook for GET requests
 */
export function useGet<T = any>(
    url: string,
    options: FetchOptions = {}
): FetchState<T> & { refetch: () => void } {
    return useFetch<T>(url, { ...options, method: 'GET' });
}

/**
 * usePost - Hook for POST requests
 */
export function usePost<T = any>(url: string): MutationState<T> {
    const { post, loading, error: networkError } = useNetwork();
    const [data, setData] = useState<T | null>(null);
    const [localError, setLocalError] = useState<Error | null>(null);

    const execute = useCallback(
        async (body?: any): Promise<T | null> => {
            setLocalError(null);
            setData(null);
            try {
                const result = await post<T>(url, body);
                setData(result);
                return result;
            } catch (err) {
                setLocalError(err instanceof Error ? err : new Error(String(err)));
                return null;
            }
        },
        [url, post]
    );

    const reset = useCallback(() => {
        setData(null);
        setLocalError(null);
    }, []);

    return {
        data,
        loading,
        error: localError || networkError,
        execute,
        reset,
    };
}

/**
 * usePut - Hook for PUT requests
 */
export function usePut<T = any>(url: string): MutationState<T> {
    const { put, loading, error: networkError } = useNetwork();
    const [data, setData] = useState<T | null>(null);
    const [localError, setLocalError] = useState<Error | null>(null);

    const execute = useCallback(
        async (body?: any): Promise<T | null> => {
            setLocalError(null);
            setData(null);
            try {
                const result = await put<T>(url, body);
                setData(result);
                return result;
            } catch (err) {
                setLocalError(err instanceof Error ? err : new Error(String(err)));
                return null;
            }
        },
        [url, put]
    );

    const reset = useCallback(() => {
        setData(null);
        setLocalError(null);
    }, []);

    return {
        data,
        loading,
        error: localError || networkError,
        execute,
        reset,
    };
}

/**
 * usePatch - Hook for PATCH requests
 * Note: useNetwork might not expose patch directly, so using request if available or implementing via custom params if needed.
 * useNetwork exports get, post, put, del. We'll use 'put' as a fallback or assume extended useNetwork.
 * Actually, let's implement it using the same pattern but check if useNetwork supports it.
 * useNetwork.ts provided shows get, post, put, del. No patch.
 * We will extend usage here or map to PUT if acceptable, OR (better) adding PATCH support to useNetwork later.
 * For now, we will use a raw fetch fallback for PATCH to maintain functionality, or better yet, assume we can update useNetwork too.
 * Let's stick to matching the interface but using 'post' with method override if supported, or just keep raw implementation for PATCH.
 * Wait, sticking to raw implementation for PATCH is safer if useNetwork doesn't support it.
 */
export function usePatch<T = any>(url: string): MutationState<T> {
    // keeping original implementation for PATCH as useNetwork doesn't support it yet
    const [state, setState] = useState<FetchState<T>>({
        data: null,
        loading: false,
        error: null,
    });

    const abortControllerRef = useRef<AbortController | null>(null);

    const execute = useCallback(
        async (body?: any): Promise<T | null> => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }

            abortControllerRef.current = new AbortController();
            setState({ data: null, loading: true, error: null });

            try {
                const response = await fetch(url, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: body ? JSON.stringify(body) : undefined,
                    credentials: 'include',
                    signal: abortControllerRef.current.signal,
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setState({ data, loading: false, error: null });
                return data;
            } catch (error) {
                if (error instanceof Error && error.name === 'AbortError') {
                    return null;
                }
                setState({ data: null, loading: false, error: error as Error });
                return null;
            }
        },
        [url]
    );

    const reset = useCallback(() => {
        setState({ data: null, loading: false, error: null });
    }, []);

    useEffect(() => {
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    return {
        ...state,
        execute,
        reset,
    };
}

/**
 * useDelete - Hook for DELETE requests
 */
export function useDelete<T = any>(url: string): MutationState<T> {
    const { del, loading, error: networkError } = useNetwork();
    const [data, setData] = useState<T | null>(null);
    const [localError, setLocalError] = useState<Error | null>(null);

    const execute = useCallback(
        async (body?: any): Promise<T | null> => {
            setLocalError(null);
            try {
                // useNetwork.del doesn't strictly support body in signature but underlying fetch does.
                // However, useNetwork del signature is (endpoint, options).
                // We'll pass body in options if needed, though DELETE with body is rare/discouraged.
                const options = body ? { body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } } : {};
                const result = await del<T>(url, options);
                setData(result);
                return result;
            } catch (err) {
                setLocalError(err instanceof Error ? err : new Error(String(err)));
                return null;
            }
        },
        [url, del]
    );

    const reset = useCallback(() => {
        setData(null);
        setLocalError(null);
    }, []);

    return {
        data,
        loading,
        error: localError || networkError,
        execute,
        reset
    };
}

/**
 * usePostArrayBuffer - Hook for POST requests that return ArrayBuffer
 * useNetwork supports 'blob' or 'text' or 'json' via responseType. ArrayBuffer not explicitly exposed but Blob is close.
 * We'll keep the custom implementation to ensure ArrayBuffer return type specifically, 
 * OR update it to use network.post with responseType='blob' and convert.
 * Let's keep custom implementation for max safety on this specific utility for now.
 */
export function usePostArrayBuffer(url: string) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const abortControllerRef = useRef<AbortController | null>(null);

    const execute = useCallback(
        async (body?: any): Promise<ArrayBuffer | null> => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }

            abortControllerRef.current = new AbortController();
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: body ? JSON.stringify(body) : undefined,
                    credentials: 'include',
                    signal: abortControllerRef.current.signal,
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.arrayBuffer();
                setLoading(false);
                return data;
            } catch (error) {
                if (error instanceof Error && error.name === 'AbortError') {
                    return null;
                }
                setError(error as Error);
                setLoading(false);
                return null;
            }
        },
        [url]
    );

    const reset = useCallback(() => {
        setLoading(false);
        setError(null);
    }, []);

    useEffect(() => {
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    return {
        execute,
        loading,
        error,
        reset,
    };
}

