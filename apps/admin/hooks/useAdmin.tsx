'use client';

import { createContext, useContext, ReactNode } from 'react';

interface AdminUser {
    id: string;
    email: string;
    name: string;
    role: string;
}

interface AdminContextType {
    user: AdminUser | null;
    logout: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function useAdmin() {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error('useAdmin must be used within AdminProvider');
    }
    return context;
}

export { AdminContext };
export type { AdminUser, AdminContextType };
