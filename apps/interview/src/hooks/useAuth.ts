"use client";

import { useState, useCallback, useEffect } from 'react';
import { ENV } from '../config/env';
import { useAppNetwork, API_ENDPOINTS } from './useAppNetwork';

const API_BASE = ENV.API_URL;

export interface User {
    id: string;
    name?: string;
    email?: string;
    picture?: string;
}

export function useAuth() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const network = useAppNetwork();
    const isProd = window.location.hostname.endsWith('hirecta.com');

    // Initial check for auth status
    useEffect(() => {
        const checkAuth = async () => {
            // Capture token from URL if present (from auth app redirect)
            if (typeof window !== 'undefined') {
                const params = new URLSearchParams(window.location.search);
                const tokenFromUrl = params.get('token');

                if (tokenFromUrl) {

                    const domain = isProd ? '; domain=.hirecta.com' : 'domain=localhost';
                    const secure = isProd ? '; secure' : '';
                    document.cookie = `token=${tokenFromUrl}; path=/; max-age=${7 * 24 * 60 * 60}${domain}${secure}; samesite=lax`;
                    localStorage.setItem("authToken", tokenFromUrl);

                    // Remove token from URL for security
                    const url = new URL(window.location.href);
                    url.searchParams.delete("token");
                    url.searchParams.delete("name");
                    url.searchParams.delete("email");
                    window.history.replaceState({}, '', url.pathname + url.search);
                }
            }

            try {
                const userData = await network.get<User>(API_ENDPOINTS.AUTH.USER);
                if (userData) {
                    setUser(userData);
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                setIsLoggedIn(false);
            }
        };

        checkAuth();
    }, [network]);

    const logout = useCallback(async () => {
        try {
            await network.post(API_ENDPOINTS.AUTH.LOGOUT);
            document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;" + (isProd ? '; domain=.hirecta.com' : 'domain=localhost');
            document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            localStorage.removeItem("authToken");
            window.location.href = ENV.AUTH_URL;
            setIsLoggedIn(false);
            setUser(null);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }, [network]);

    return {
        isLoggedIn,
        user,
        logout
    };
}
