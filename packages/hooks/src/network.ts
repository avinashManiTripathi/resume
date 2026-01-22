import { useState, useEffect, useCallback, useRef } from 'react';

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
 * useFetch - Generic hook for fetching data
 * 
 * @param url - The URL to fetch from
 * @param options - Fetch options including skip flag
 * @returns Object with data, loading, error, and refetch function
 * 
 * @example
 * const { data, loading, error, refetch } = useFetch<User>('/api/user');
 */
export function useFetch<T = any>(
    url: string,
    options: FetchOptions = {}
): FetchState<T> & { refetch: () => void } {
    const [state, setState] = useState<FetchState<T>>({
        data: null,
        loading: !options.skip,
        error: null,
    });

    const abortControllerRef = useRef<AbortController | null>(null);

    const fetchData = useCallback(async () => {
        if (options.skip) return;

        // Cancel previous request
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        abortControllerRef.current = new AbortController();

        setState(prev => ({ ...prev, loading: true, error: null }));

        try {
            const response = await fetch(url, {
                ...options,
                credentials: 'include',
                signal: abortControllerRef.current.signal,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setState({ data, loading: false, error: null });
        } catch (error) {
            if (error instanceof Error && error.name === 'AbortError') {
                return; // Request was cancelled
            }
            setState({ data: null, loading: false, error: error as Error });
        }
    }, [url, options.skip]);

    useEffect(() => {
        fetchData();

        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, [fetchData]);

    return {
        ...state,
        refetch: fetchData,
    };
}

/**
 * useGet - Hook for GET requests
 * 
 * @param url - The URL to fetch from
 * @param options - Fetch options
 * @returns Object with data, loading, error, and refetch function
 * 
 * @example
 * const { data, loading, error } = useGet<User[]>('/api/users');
 */
export function useGet<T = any>(
    url: string,
    options: FetchOptions = {}
): FetchState<T> & { refetch: () => void } {
    return useFetch<T>(url, { ...options, method: 'GET' });
}

/**
 * usePost - Hook for POST requests
 * 
 * @param url - The URL to post to
 * @returns Object with execute function, data, loading, and error
 * 
 * @example
 * const { execute, data, loading, error } = usePost<User>('/api/users');
 * await execute({ name: 'John Doe' });
 */
export function usePost<T = any>(url: string): MutationState<T> {
    const [state, setState] = useState<FetchState<T>>({
        data: null,
        loading: false,
        error: null,
    });

    const abortControllerRef = useRef<AbortController | null>(null);

    const execute = useCallback(
        async (body?: any): Promise<T | null> => {
            // Cancel previous request
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }

            abortControllerRef.current = new AbortController();
            setState({ data: null, loading: true, error: null });

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
 * usePut - Hook for PUT requests
 * 
 * @param url - The URL to put to
 * @returns Object with execute function, data, loading, and error
 * 
 * @example
 * const { execute, loading } = usePut<User>('/api/user/123');
 * await execute({ name: 'Jane Doe' });
 */
export function usePut<T = any>(url: string): MutationState<T> {
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
                    method: 'PUT',
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
 * usePatch - Hook for PATCH requests
 * 
 * @param url - The URL to patch
 * @returns Object with execute function, data, loading, and error
 * 
 * @example
 * const { execute, loading } = usePatch<User>('/api/user/123');
 * await execute({ email: 'newemail@example.com' });
 */
export function usePatch<T = any>(url: string): MutationState<T> {
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
 * 
 * @param url - The URL to delete
 * @returns Object with execute function, data, loading, and error
 * 
 * @example
 * const { execute, loading } = useDelete('/api/user/123');
 * await execute();
 */
export function useDelete<T = any>(url: string): MutationState<T> {
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
                    method: 'DELETE',
                    headers: body ? {
                        'Content-Type': 'application/json',
                    } : undefined,
                    body: body ? JSON.stringify(body) : undefined,
                    credentials: 'include',
                    signal: abortControllerRef.current.signal,
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                // DELETE might not return JSON
                let data: T | null = null;
                const text = await response.text();
                if (text) {
                    try {
                        data = JSON.parse(text);
                    } catch {
                        // Response is not JSON
                    }
                }

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
 * usePostArrayBuffer - Hook for POST requests that return ArrayBuffer (e.g., PDF generation)
 * Includes automatic request cancellation via AbortController
 * 
 * @param url - The URL to post to
 * @returns Object with execute function, loading state, and error
 * 
 * @example
 * const { execute, loading, error } = usePostArrayBuffer('/api/pdf/generate');
 * const pdfData = await execute({ resumeData });
 */
export function usePostArrayBuffer(url: string) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const abortControllerRef = useRef<AbortController | null>(null);

    const execute = useCallback(
        async (body?: any): Promise<ArrayBuffer | null> => {
            // Cancel previous request if still pending
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
                    // Request was cancelled - this is expected behavior
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
            // Cleanup: cancel any pending request on unmount
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
