"use client";

import { useState, useCallback } from 'react';

interface NetworkOptions extends RequestInit {
    baseUrl?: string;
    queryParams?: Record<string, string | number | boolean | undefined>;
    responseType?: 'json' | 'blob' | 'text';
}

interface NetworkResponse<T = any> {
    data: T | null;
    error: Error | null;
    loading: boolean;
    status?: number;
}

export function useNetwork(defaultBaseUrl: string = '') {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const request = useCallback(async <T = any>(endpoint: string, options: NetworkOptions = {}): Promise<T> => {
        setLoading(true);
        setError(null);

        const { baseUrl = defaultBaseUrl, queryParams, responseType = 'json', ...fetchOptions } = options;

        // Construct URL with query params
        let url = `${baseUrl}${endpoint}`;
        if (queryParams) {
            const params = new URLSearchParams();
            Object.entries(queryParams).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    params.append(key, String(value));
                }
            });
            const queryString = params.toString();
            if (queryString) {
                url += (url.includes('?') ? '&' : '?') + queryString;
            }
        }

        try {
            const headers: HeadersInit = {
                'Accept': 'application/json',
                ...fetchOptions.headers,
            };

            // Only set Content-Type to application/json if body is not FormData
            // If body is FormData, let the browser set the Content-Type with boundary
            if (!(fetchOptions.body instanceof FormData) && !headers['Content-Type' as keyof HeadersInit]) {
                (headers as any)['Content-Type'] = 'application/json';
            }

            const response = await fetch(url, {
                credentials: 'include', // Default to include cookies
                ...fetchOptions,
                headers,
            });

            if (!response.ok) {
                // Try to parse error message from response
                let errorMessage = `HTTP error! status: ${response.status}`;
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorData.error || errorMessage;
                } catch (e) {
                    // parsing failed, use default message
                }
                throw new Error(errorMessage);
            }

            // Check for empty response (e.g. 204 No Content)
            if (response.status === 204) {
                return {} as T;
            }

            if (responseType === 'blob') {
                return await response.blob() as unknown as T;
            } else if (responseType === 'text') {
                return await response.text() as unknown as T;
            } else {
                return await response.json();
            }
        } catch (err: any) {
            const errorObj = err instanceof Error ? err : new Error(String(err));
            setError(errorObj);
            throw errorObj;
        } finally {
            setLoading(false);
        }
    }, [defaultBaseUrl]);

    const get = useCallback(<T = any>(endpoint: string, options?: NetworkOptions) => {
        return request<T>(endpoint, { ...options, method: 'GET' });
    }, [request]);

    const post = useCallback(<T = any>(endpoint: string, body?: any, options?: NetworkOptions) => {
        const isFormData = body instanceof FormData;
        return request<T>(endpoint, {
            ...options,
            method: 'POST',
            body: isFormData ? body : JSON.stringify(body)
        });
    }, [request]);

    const put = useCallback(<T = any>(endpoint: string, body?: any, options?: NetworkOptions) => {
        const isFormData = body instanceof FormData;
        return request<T>(endpoint, {
            ...options,
            method: 'PUT',
            body: isFormData ? body : JSON.stringify(body)
        });
    }, [request]);

    const del = useCallback(<T = any>(endpoint: string, options?: NetworkOptions) => {
        return request<T>(endpoint, { ...options, method: 'DELETE' });
    }, [request]);

    return {
        get,
        post,
        put,
        del,
        loading,
        error
    };
}
