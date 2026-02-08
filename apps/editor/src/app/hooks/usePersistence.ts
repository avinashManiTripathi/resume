"use client";

import { useState, useCallback, useEffect } from 'react';
import { ENV } from '../env';
import { useAppNetwork, API_ENDPOINTS } from './useAppNetwork';

const LOCAL_STORAGE_KEY = 'profresume_saved_documents';
const API_BASE = ENV.API_URL;

export interface SavedDocument {
    id: string;
    _id?: string;
    title: string;
    type: 'resume' | 'cover-letter' | 'ats-scan' | 'tailor-history' | 'interview-session';
    templateId: string;
    data: any;
    lastModified: string;
}

export function usePersistence() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const [user, setUser] = useState<any>(null);
    const [subscription, setSubscription] = useState<any>(null);
    const [showPersistencePopup, setShowPersistencePopup] = useState(false);

    const { get, post, del } = useAppNetwork();


    // Initial check for auth status
    useEffect(() => {
        const checkAuth = async () => {
            // Capture token from URL if present (from auth app redirect)
            if (typeof window !== 'undefined') {
                const params = new URLSearchParams(window.location.search);
                const tokenFromUrl = params.get('token');

                if (tokenFromUrl) {
                    const isProd = window.location.hostname.endsWith('hirecta.com');
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
                const userData = await get(API_ENDPOINTS.AUTH.USER);
                setUser(userData);
                setIsLoggedIn(true);

                // Also fetch subscription status
                try {
                    const subData = await get<{ subscription: any }>(API_ENDPOINTS.SUBSCRIPTION.STATUS);
                    setSubscription(subData.subscription);
                } catch (subError) {
                    console.error('Failed to fetch subscription status:', subError);
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                setIsLoggedIn(false);
            }
        };

        checkAuth();
    }, [get]);

    const saveToLocalStorage = useCallback((doc: Omit<SavedDocument, 'lastModified'>) => {
        try {
            const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
            const documents: SavedDocument[] = stored ? JSON.parse(stored) : [];

            const now = new Date().toISOString();

            // For resumes, we upsert by templateId. For others, keep using ID.
            const existingIndex = doc.type === 'resume'
                ? documents.findIndex(d => d.type === 'resume' && d.templateId === doc.templateId)
                : documents.findIndex(d => d.id === doc.id);

            if (existingIndex > -1) {
                // Keep the existing ID if it exists, but update content
                const existingId = documents[existingIndex].id;
                documents[existingIndex] = { ...doc, id: existingId, lastModified: now };
            } else {
                documents.push({ ...doc, lastModified: now });
            }

            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(documents));
            return true;
        } catch (error) {
            console.error('Failed to save to local storage:', error);
            return false;
        }
    }, []);

    const saveToBackend = useCallback(async (doc: Omit<SavedDocument, 'lastModified'>) => {
        try {
            const endpoint = doc.type === 'resume' ? API_ENDPOINTS.RESUME.SAVE : API_ENDPOINTS.COVER_LETTER.SAVE;

            // For resumes, we rely on the backend's template-based upsert logic
            // We don't strictly need to send ID, but sending it doesn't hurt.
            // Critical part is sending template/templateId correctly.
            const payload = {
                id: doc.id.startsWith('guest_') || doc.id.startsWith('doc_') ? undefined : doc.id,
                title: doc.title,
                template: doc.templateId, // Backend uses 'template' for resume
                templateId: doc.templateId, // Backend uses 'templateId' for cover letter
                data: doc.data
            };

            const result = await post<{ data: any }>(endpoint, payload);

            return result.data?._id || result.data?.id;
        } catch (error) {
            console.error('Failed to save to backend:', error);
            return null;
        }
    }, [post]);

    const saveDocument = useCallback(async (doc: Omit<SavedDocument, 'lastModified' | 'id'> & { id?: string }) => {
        // If no ID, generate a temporary one
        const documentId = doc.id || `doc_${Date.now()}`;

        // ATS Scans and Tailor History are always local for now
        if (doc.type === 'ats-scan' || doc.type === 'tailor-history') {
            const success = saveToLocalStorage({ ...doc, id: documentId });
            return { success, id: documentId, storage: 'local' as const };
        }

        if (isLoggedIn) {
            const backendId = await saveToBackend({ ...doc, id: documentId });
            return { success: !!backendId, id: backendId, storage: 'cloud' as const };
        } else {
            // Show popup if it hasn't been shown in this segment or something
            // For now, let's just save and return
            const success = saveToLocalStorage({ ...doc, id: documentId });
            return { success, id: documentId, storage: 'local' as const };
        }
    }, [isLoggedIn, saveToBackend, saveToLocalStorage]);

    const getDocument = useCallback(async (id: string, type: 'resume' | 'cover-letter') => {
        if (id.startsWith('doc_')) {
            // Check local storage
            try {
                const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
                const documents: SavedDocument[] = stored ? JSON.parse(stored) : [];
                return documents.find(d => d.id === id) || null;
            } catch (e) {
                return null;
            }
        }

        if (isLoggedIn) {
            try {
                const endpoint = type === 'resume'
                    ? API_ENDPOINTS.RESUME.GET(id)
                    : API_ENDPOINTS.COVER_LETTER.GET(id);

                const result = await get<{ data: any }>(endpoint);

                return {
                    id: result.data._id || result.data.id,
                    title: result.data.title,
                    type,
                    templateId: result.data.template || result.data.templateId,
                    data: result.data.data,
                    lastModified: result.data.updatedAt
                } as SavedDocument;
            } catch (error) {
                console.error('Failed to fetch document:', error);
            }
        }
        return null;
    }, [isLoggedIn, get]);

    const getDocuments = useCallback(async () => {
        let backendDocs: any[] = [];
        let localDocs: SavedDocument[] = [];

        // Get local docs
        try {
            const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
            localDocs = stored ? JSON.parse(stored) : [];
        } catch (e) {
            console.error('Error loading local docs:', e);
        }

        if (isLoggedIn) {
            try {
                const [resumesData, lettersData, interviewsData] = await Promise.all([
                    get<{ data: any[] }>(API_ENDPOINTS.RESUME.BASE).catch(() => ({ data: [] })),
                    get<{ data: any[] }>(API_ENDPOINTS.COVER_LETTER.BASE).catch(() => ({ data: [] })),
                    get<{ data: any[] }>(API_ENDPOINTS.INTERVIEW.SESSIONS).catch(() => ({ data: [] }))
                ]);

                if (resumesData?.data) {
                    backendDocs = [...backendDocs, ...resumesData.data.map((d: any) => ({ ...d, type: 'resume' }))];
                }

                if (lettersData?.data) {
                    backendDocs = [...backendDocs, ...lettersData.data.map((d: any) => ({ ...d, type: 'cover-letter' }))];
                }

                if (interviewsData?.data) {
                    backendDocs = [...backendDocs, ...interviewsData.data.map((d: any) => ({
                        id: d._id,
                        _id: d._id,
                        title: d.jdInfo?.jobTitle ? `${d.jdInfo.jobTitle} @ ${d.jdInfo.company}` : "Mock Interview",
                        type: 'interview-session',
                        templateId: 'interview',
                        data: d,
                        lastModified: d.updatedAt || d.createdAt
                    }))];
                }
            } catch (error) {
                console.error('Failed to fetch backend documents:', error);
            }
        }

        return { backendDocs, localDocs };
    }, [isLoggedIn, get]);

    const deleteDocument = useCallback(async (id: string, type: 'resume' | 'cover-letter' | 'ats-scan' | 'tailor-history' | 'interview-session') => {
        if (id.startsWith('doc_')) {
            // Delete from local storage
            try {
                const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
                const documents: SavedDocument[] = stored ? JSON.parse(stored) : [];
                const filtered = documents.filter(d => d.id !== id);
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
                return true;
            } catch (e) {
                console.error('Failed to delete from local storage:', e);
                return false;
            }
        }
        if (isLoggedIn) {
            try {
                const endpoint = type === 'resume'
                    ? API_ENDPOINTS.RESUME.DELETE(id)
                    : API_ENDPOINTS.COVER_LETTER.DELETE(id);

                await del(endpoint);
                return true;
            } catch (error) {
                console.error('Failed to delete from backend:', error);
                return false;
            }
        }
        return false;
    }, [isLoggedIn, del]);

    const logout = useCallback(async () => {
        try {
            await post(API_ENDPOINTS.AUTH.LOGOUT);
            const isProd = window.location.hostname.endsWith('hirecta.com');
            document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;" + (isProd ? '; domain=.hirecta.com' : 'domain=localhost');
            localStorage.removeItem("authToken");
            window.location.href = ENV.AUTH_URL;
            setIsLoggedIn(false);
            setUser(null);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }, [post]);

    const refreshSubscription = useCallback(async () => {
        try {
            console.log('[Subscription] Refreshing subscription status...');
            const subData = await get<{ subscription: any }>(API_ENDPOINTS.SUBSCRIPTION.STATUS);
            setSubscription(subData.subscription);
            console.log('[Subscription] Updated:', subData.subscription);
            return subData.subscription;
        } catch (error) {
            console.error('Failed to refresh subscription status:', error);
            return null;
        }
    }, [get]);

    return {
        isLoggedIn,
        user,
        subscription,
        setSubscription,
        refreshSubscription,
        logout,
        saveDocument,
        deleteDocument,
        getDocuments,
        getDocument,
        showPersistencePopup,
        setShowPersistencePopup
    };
}
