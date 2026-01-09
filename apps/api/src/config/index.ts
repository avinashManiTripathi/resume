export const config = {
    port: process.env.PORT || 4000,
    nodeEnv: process.env.NODE_ENV || 'development',
    corsOrigin: process.env.CORS_ORIGIN || '*',

    // PDF generation settings
    pdf: {
        outputDir: process.env.PDF_OUTPUT_DIR || './output',
        maxFileSize: 10 * 1024 * 1024, // 10MB
        timeout: 30000, // 30 seconds
    },

    // Rate limiting
    rateLimit: {
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
    },

    // AI configuration
    geminiApiKey: process.env.GEMINI_API_KEY || 'AIzaSyCDSugzsIRrSbKT2eimReibCncLozIuKEg',
};
