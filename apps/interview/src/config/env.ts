const isProd = typeof window !== 'undefined' && window.location.hostname.endsWith('profresume.com');

export const ENV = {
    API_URL: isProd ? 'https://api.profresume.com' : 'http://localhost:3000',
    AUTH_URL: isProd ? 'https://auth.profresume.com' : 'http://localhost:3001',
    EDITOR_URL: isProd ? 'https://edit.profresume.com' : 'http://localhost:3002',
};
