import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface UseResumeDownloadProps {
    isLoggedIn: boolean | null;
    subscription: any;
    refreshSubscription?: () => Promise<any>;
    handleExport: (format: "pdf" | "doc") => Promise<void>;
    canDownload: (sub: any) => boolean;
}

export const useResumeDownload = ({
    isLoggedIn,
    subscription,
    refreshSubscription,
    handleExport,
    canDownload
}: UseResumeDownloadProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Use a ref to ensure we only trigger download ONCE per page load/session
    const downloadProcessedRef = useRef(false);

    useEffect(() => {
        const checkAndProcessDownload = async () => {
            // 1. Basic prerequisite checks
            if (!isLoggedIn || subscription === undefined || downloadProcessedRef.current) {
                return;
            }

            const subscribed = searchParams.get('subscribed');
            const pendingFormat = sessionStorage.getItem('pending_download');

            // 2. Scenario: Returning from Subscription (Payment Success)
            if (subscribed === 'true') {

                // If we have a pending download format, we need to ensure subscription is active
                if (pendingFormat) {

                    // Check if local subscription state is stale (still says free/expired)
                    if (!canDownload(subscription)) {
                        console.log('[useResumeDownload] Subscription stale after payment, refreshing...');
                        if (refreshSubscription) {
                            await refreshSubscription();
                            // RETURN HERE: The refresh will update 'subscription' prop
                            // This effect will run again with fresh data
                            return;
                        }
                    }

                    // If we reach here, subscription is either already valid OR was just refreshed
                    // and this is the second run of the effect.
                    console.log('[useResumeDownload] Valid subscription detected, triggering pending download:', pendingFormat);

                    // Lock to prevent duplicate downloads
                    downloadProcessedRef.current = true;

                    // Clear flag immediately
                    sessionStorage.removeItem('pending_download');

                    // Trigger download
                    await handleExport(pendingFormat as "pdf" | "doc");

                    // Cleanup URL
                    const url = new URL(window.location.href);
                    url.searchParams.delete('subscribed');
                    window.history.replaceState({}, '', url.toString());
                    console.log('[useResumeDownload] Cleaned up URL params');

                } else {
                    // Just subscribed but no pending download (maybe just browsing plans)
                    // Clean up URL basically
                    const url = new URL(window.location.href);
                    url.searchParams.delete('subscribed');
                    window.history.replaceState({}, '', url.toString());
                }
            }
            // 3. Scenario: Returning from Login (with pending download)
            else if (pendingFormat) {
                // This handles the "Not Logged In -> Login -> Redirect Back" case
                // We check if they have subscription immediately

                if (canDownload(subscription)) {
                    console.log('[useResumeDownload] User logged in with valid subscription, auto-downloading');
                    downloadProcessedRef.current = true;
                    sessionStorage.removeItem('pending_download');
                    await handleExport(pendingFormat as "pdf" | "doc");
                } else {
                    // User logged in but NO subscription.
                    console.log('[useResumeDownload] User logged in but needs subscription, NOT auto-redirecting. Waiting for user action.');
                    downloadProcessedRef.current = true;
                    sessionStorage.removeItem('pending_download');
                }
            }
        };

        checkAndProcessDownload();
    }, [isLoggedIn, subscription, searchParams, refreshSubscription, handleExport, canDownload]);
};
