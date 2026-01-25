'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminContext, AdminUser } from '@/hooks/useAdmin';
import { useAppNetwork, API_ENDPOINTS } from '@/hooks/useAppNetwork';
import { ENV } from '@/app/env';

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [isVerifying, setIsVerifying] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [user, setUser] = useState<AdminUser | null>(null);
    const network = useAppNetwork();

    useEffect(() => {
        async function verifyAdmin() {
            try {
                const response = await network.get<{ isAdmin: boolean, user: AdminUser }>(API_ENDPOINTS.AUTH.VERIFY_ADMIN);

                if (response.isAdmin && response.user) {
                    setUser(response.user);
                    setIsAuthorized(true);
                    setIsVerifying(false);
                    return;
                }

                // Not admin or not logged in, redirect to auth
                window.location.href = ENV.AUTH_URL + '?redirect=' + encodeURIComponent(window.location.href);
            } catch (error) {
                console.error('Admin verification error:', error);
                // Redirect to auth on error
                window.location.href = ENV.AUTH_URL + '?redirect=' + encodeURIComponent(window.location.href);
            }
        }

        verifyAdmin();
    }, [router, network]);

    const logout = async () => {
        try {
            await network.post(API_ENDPOINTS.AUTH.LOGOUT);
            console.log('Logout successful, cookie cleared');

            // Small delay to ensure cookie clearing completes
            await new Promise(resolve => setTimeout(resolve, 100));
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Clear local state
            setUser(null);
            setIsAuthorized(false);

            // Redirect to auth page
            window.location.href = ENV.AUTH_URL
        }
    };

    if (isVerifying) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Verifying admin access...</p>
                </div>
            </div>
        );
    }

    if (!isAuthorized) {
        return null; // Redirecting...
    }

    return (
        <AdminContext.Provider value={{ user, logout }}>
            {children}
        </AdminContext.Provider>
    );
}
