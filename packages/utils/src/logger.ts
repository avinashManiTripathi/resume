/**
 * Production-safe logger utility
 * Suppresses all console logs in production environment
 */

const isProduction = process.env.NODE_ENV === 'production';

export const logger = {
    log: (...args: any[]) => {
        if (!isProduction) {
            console.log(...args);
        }
    },

    error: (...args: any[]) => {
        if (!isProduction) {
            console.error(...args);
        }
        // In production, you might want to send errors to a logging service
        // Example: sendToLoggingService('error', args);
    },

    warn: (...args: any[]) => {
        if (!isProduction) {
            console.warn(...args);
        }
    },

    info: (...args: any[]) => {
        if (!isProduction) {
            console.info(...args);
        }
    },

    debug: (...args: any[]) => {
        if (!isProduction) {
            console.debug(...args);
        }
    },
};

// Suppress all console methods in production globally
if (isProduction && typeof window !== 'undefined') {
    window.console.log = () => { };
    window.console.error = () => { };
    window.console.warn = () => { };
    window.console.info = () => { };
    window.console.debug = () => { };
}
