"use client";

import { useState, useCallback, useEffect } from 'react';
import { ENV } from '../env';

const LOCAL_STORAGE_KEY = 'profresume_saved_documents';
const API_BASE = "https://api.profresume.com";

export interface SavedDocument {
    id: string;
    _id?: string;
    title: string;
    type: 'resume' | 'cover-letter';
    templateId: string;
    data: any;
    lastModified: string;
}

export function usePersistence() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const [user, setUser] = useState<any>(null);
    const [showPersistencePopup, setShowPersistencePopup] = useState(false);

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

    const saveToLocalStorage = useCallback((doc: Omit<SavedDocument, 'lastModified'>) => {
        try {
            const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
            const documents: SavedDocument[] = stored ? JSON.parse(stored) : [];

            const now = new Date().toISOString();
            const existingIndex = documents.findIndex(d => d.id === doc.id);

            if (existingIndex > -1) {
                documents[existingIndex] = { ...doc, lastModified: now };
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
            const endpoint = doc.type === 'resume' ? '/api/resume' : '/api/cover-letter/save';
            const response = await fetch(`${API_BASE}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    id: doc.id.startsWith('guest_') ? undefined : doc.id,
                    title: doc.title,
                    template: doc.templateId, // Backend uses 'template' for resume
                    templateId: doc.templateId, // Backend uses 'templateId' for cover letter
                    data: doc.data
                })
            });

            if (!response.ok) throw new Error('Backend save failed');

            const result = await response.json();
            return result.data?._id || result.data?.id;
        } catch (error) {
            console.error('Failed to save to backend:', error);
            return null;
        }
    }, []);

    const saveDocument = useCallback(async (doc: Omit<SavedDocument, 'lastModified' | 'id'> & { id?: string }) => {
        // If no ID, generate a temporary one
        const documentId = doc.id || `doc_${Date.now()}`;

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
                const endpoint = type === 'resume' ? `/api/resume/${id}` : `/api/cover-letter/${id}`;
                const response = await fetch(`${API_BASE}${endpoint}`, {
                    credentials: 'include'
                });
                if (response.ok) {
                    const result = await response.json();
                    return {
                        id: result.data._id || result.data.id,
                        title: result.data.title,
                        type,
                        templateId: result.data.template || result.data.templateId,
                        data: result.data.data,
                        lastModified: result.data.updatedAt
                    } as SavedDocument;
                }
            } catch (error) {
                console.error('Failed to fetch document:', error);
            }
        }
        return null;
    }, [isLoggedIn]);

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
                const [resumesRes, lettersRes] = await Promise.all([
                    fetch(`${API_BASE}/api/resume`, { credentials: 'include' }),
                    fetch(`${API_BASE}/api/cover-letter`, { credentials: 'include' })
                ]);

                if (resumesRes.ok) {
                    const data = await resumesRes.json();
                    backendDocs = [...backendDocs, ...data.data.map((d: any) => ({ ...d, type: 'resume' }))];
                }

                if (lettersRes.ok) {
                    const data = await lettersRes.json();
                    backendDocs = [...backendDocs, ...data.data.map((d: any) => ({ ...d, type: 'cover-letter' }))];
                }
            } catch (error) {
                console.error('Failed to fetch backend documents:', error);
            }
        }

        return { backendDocs, localDocs };
    }, [isLoggedIn]);

    const deleteDocument = useCallback(async (id: string, type: 'resume' | 'cover-letter') => {
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
                const endpoint = type === 'resume' ? `/api/resume/${id}` : `/api/cover-letter/${id}`;
                const response = await fetch(`${API_BASE}${endpoint}`, {
                    method: 'DELETE',
                    credentials: 'include'
                });
                return response.ok;
            } catch (error) {
                console.error('Failed to delete from backend:', error);
                return false;
            }
        }
        return false;
    }, [isLoggedIn]);

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
        logout,
        saveDocument,
        deleteDocument,
        getDocuments,
        getDocument,
        showPersistencePopup,
        setShowPersistencePopup
    };
}
