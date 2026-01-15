'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.profresume.com';

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [isVerifying, setIsVerifying] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        async function verifyAdmin() {
            try {
                const response = await fetch(`${API_BASE}/api/auth/verify-admin`, {
                    credentials: 'include',
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.isAdmin) {
                        setIsAuthorized(true);
                        setIsVerifying(false);
                        return;
                    }
                }

                // Not admin or not logged in, redirect to auth
                window.location.href = 'https://auth.profresume.com?redirect=' + encodeURIComponent(window.location.href);
            } catch (error) {
                console.error('Admin verification error:', error);
                // Redirect to auth on error
                window.location.href = 'https://auth.profresume.com?redirect=' + encodeURIComponent(window.location.href);
            }
        }

        verifyAdmin();
    }, [router]);

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

    return <>{children}</>;
}
