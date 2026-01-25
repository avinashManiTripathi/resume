
export interface NetworkOptions extends RequestInit {
    baseUrl?: string;
    queryParams?: Record<string, string | number | boolean | undefined>;
    responseType?: 'json' | 'text' | 'blob';
}

const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};

async function request<T = any>(url: string, options: NetworkOptions = {}): Promise<T> {
    const { queryParams, responseType = 'json', ...fetchOptions } = options;

    // Construct URL with query params
    let finalUrl = url;
    if (queryParams) {
        const params = new URLSearchParams();
        Object.entries(queryParams).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                params.append(key, String(value));
            }
        });
        const queryString = params.toString();
        if (queryString) {
            finalUrl += (finalUrl.includes('?') ? '&' : '?') + queryString;
        }
    }

    const headers = {
        ...defaultHeaders,
        ...fetchOptions.headers,
    };

    const response = await fetch(finalUrl, {
        ...fetchOptions,
        headers,
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (responseType === 'text') {
        return (await response.text()) as unknown as T;
    } else if (responseType === 'blob') {
        return (await response.blob()) as unknown as T;
    }

    return response.json();
}

export const serverNetwork = {
    get: <T = any>(url: string, options?: NetworkOptions) => request<T>(url, { ...options, method: 'GET' }),
    post: <T = any>(url: string, body?: any, options?: NetworkOptions) => request<T>(url, { ...options, method: 'POST', body: JSON.stringify(body) }),
    put: <T = any>(url: string, body?: any, options?: NetworkOptions) => request<T>(url, { ...options, method: 'PUT', body: JSON.stringify(body) }),
    delete: <T = any>(url: string, options?: NetworkOptions) => request<T>(url, { ...options, method: 'DELETE' }),
};
