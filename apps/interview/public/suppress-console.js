// Suppress all console methods in production
if (typeof window !== 'undefined') {
    const isProduction = process.env.NODE_ENV === 'production';

    if (isProduction) {
        const noop = () => { };
        window.console.log = noop;
        window.console.error = noop;
        window.console.warn = noop;
        window.console.info = noop;
        window.console.debug = noop;
        window.console.trace = noop;
    }
}
