import { useEffect, RefObject } from 'react';

/**
 * useClickOutside hook - Detect clicks outside of a specific element
 * 
 * @param ref - React ref object pointing to the element
 * @param handler - Callback function to execute when clicking outside
 * 
 * @example
 * const menuRef = useRef<HTMLDivElement>(null);
 * useClickOutside(menuRef, () => setIsOpen(false));
 * 
 * <div ref={menuRef}>Menu content</div>
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
    ref: RefObject<T>,
    handler: (event: MouseEvent | TouchEvent) => void
): void {
    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            const el = ref?.current;
            if (!el || el.contains(event.target as Node)) {
                return;
            }
            handler(event);
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler]);
}
