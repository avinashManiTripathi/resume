"use client";

import { useState, useCallback, useEffect } from 'react';
import { ENV } from '../config/env';

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

    // Initial check for auth status
    useEffect(() => {
        const checkAuth = async () => {
            // Capture token from URL if present (from auth app redirect)
            if (typeof window !== 'undefined') {
                const params = new URLSearchParams(window.location.search);
                const tokenFromUrl = params.get('token');

                if (tokenFromUrl) {
                    const isProd = window.location.hostname.endsWith('profresume.com');
                    const domain = isProd ? '; domain=.profresume.com' : '';
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
                const response = await fetch(`${API_BASE}/api/auth/user`, {
                    headers: { 'Accept': 'application/json' },
                    credentials: 'include'
                });

                if (response.ok) {
                    const userData = await response.json();
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
    }, []);

    const logout = useCallback(async () => {
        try {
            await fetch(`${API_BASE}/api/auth/logout`, {
                method: 'POST',
                credentials: 'include'
            });
            document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=.profresume.com";
            document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            localStorage.removeItem("authToken");
            window.location.href = ENV.AUTH_URL;
            setIsLoggedIn(false);
            setUser(null);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }, []);

    return {
        isLoggedIn,
        user,
        logout
    };
}
