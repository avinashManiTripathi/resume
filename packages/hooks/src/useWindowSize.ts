import { useState, useEffect } from 'react';

interface WindowSize {
    width: number;
    height: number;
}

/**
 * useWindowSize hook - Track window dimensions
 * 
 * @returns Object with current width and height of the window
 * 
 * @example
 * const { width, height } = useWindowSize();
 * 
 * if (width < 768) {
 *   // Mobile view
 * }
 */
export function useWindowSize(): WindowSize {
    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0,
    });

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
}
