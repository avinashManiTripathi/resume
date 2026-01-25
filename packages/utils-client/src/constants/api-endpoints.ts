export const API_ENDPOINTS = {
    AUTH: {
        USER: '/api/auth/user',
        LOGOUT: '/api/auth/logout',
        LOGIN: '/api/auth/login',
        REGISTER: '/api/auth/register',
        VERIFY_ADMIN: '/api/auth/verify-admin',
        GOOGLE_URL: '/api/auth/google/url',
    },
    RESUME: {
        BASE: '/api/resume',
        SAVE: '/api/resume', // POST to save/update
        GET: (id: string) => `/api/resume/${id}`,
        DELETE: (id: string) => `/api/resume/${id}`,
        TEMPLATES: '/api/templates',
        EXTRACT: '/api/resume/extract',
    },
    COVER_LETTER: {
        BASE: '/api/cover-letter',
        SAVE: '/api/cover-letter/save',
        GET: (id: string) => `/api/cover-letter/${id}`,
        DELETE: (id: string) => `/api/cover-letter/${id}`,
        TEMPLATES: '/api/cover-letter-templates',
        GENERATE: '/api/cover-letter/generate',
        PDF_PREVIEW: '/api/cover-letter/pdf-preview',
    },
    INTERVIEW: {
        SESSIONS: '/api/interview/sessions',
        SESSION: (id: string) => `/api/interview/${id}`,
        REPORT: (id: string) => `/api/interview/report/${id}`,
        START: '/api/interview/start',
        CAN_START: '/api/interview/can-start',
    },
    SUBSCRIPTION: {
        STATUS: '/api/subscription/status',
        CREATE_ORDER: '/api/subscription/create-order',
        VERIFY: '/api/subscription/verify',
    },
    ADMIN: {
        USERS: '/api/admin/users',
        TEMPLATES: '/api/admin/templates',
        STATS: '/api/admin/stats',
        PLANS: '/api/admin/plans',
        FEATURE_SETTINGS: '/api/admin/feature-settings',
    },
    LANDING: {
        NAVIGATION: '/api/landing/navigation',
    },
    BLOG: {
        BASE: '/api/blog',
        GET: (id: string) => `/api/blog/${id}`,
        SLUG: (slug: string) => `/api/blog/slug/${slug}`,
        DELETE: (id: string) => `/api/blog/${id}`,
    },
    PDF: {
        CONVERT: '/convert-html-to-pdf',
    },
    TAILOR: {
        ANALYZE: '/api/tailor/analyze',
        PARSE: '/api/tailor/parse',
    },
    ATS: {
        CHECK: '/api/ats/check',
    }
} as const;
