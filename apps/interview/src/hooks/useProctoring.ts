import { useState, useEffect, useCallback } from 'react';

export interface ProctoringStats {
    violationCount: number;
    isTabActive: boolean;
    isFullscreen: boolean;
    warnings: string[];
}

export const useProctoring = (isActive: boolean = true) => {
    const [stats, setStats] = useState<ProctoringStats>({
        violationCount: 0,
        isTabActive: true,
        isFullscreen: false,
        warnings: []
    });

    const logViolation = useCallback((type: string) => {
        setStats(prev => {
            const newCount = prev.violationCount + 1;
            const warnings = [...prev.warnings, `${type} detected at ${new Date().toLocaleTimeString()}`];

            // Play warning sound? (Optional)
            return {
                ...prev,
                violationCount: newCount,
                warnings: warnings.slice(-5) // Keep last 5
            };
        });
    }, []);

    useEffect(() => {
        if (!isActive) return;

        const handleVisibilityChange = () => {
            if (document.hidden) {
                setStats(prev => ({ ...prev, isTabActive: false }));
                logViolation('Tab switch/Window hidden');
            } else {
                setStats(prev => ({ ...prev, isTabActive: true }));
            }
        };

        const handleBlur = () => {
            // Blur can trigger on simple interactions, so strict visibilityState is better for "cheating"
            // But we can track it as a minor warning
            // logViolation('Window focus lost');
        };

        const handleFullscreenChange = () => {
            const isFs = !!document.fullscreenElement;
            setStats(prev => ({ ...prev, isFullscreen: isFs }));
            if (!isFs) {
                logViolation('Exited fullscreen');
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('blur', handleBlur);
        document.addEventListener('fullscreenchange', handleFullscreenChange);

        // Initial check
        setStats(prev => ({ ...prev, isFullscreen: !!document.fullscreenElement }));

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('blur', handleBlur);
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, [isActive, logViolation]);

    const requestFullscreen = async () => {
        try {
            await document.documentElement.requestFullscreen();
        } catch (err) {
            console.error('Fullscreen denied:', err);
        }
    };

    return {
        stats,
        requestFullscreen,
        hasViolations: stats.violationCount > 0
    };
};
