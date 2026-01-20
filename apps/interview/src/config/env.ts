const isProd = typeof window !== 'undefined' && window.location.hostname.endsWith('hirecta.com');

export const ENV = {
    API_URL: isProd ? 'https://api.hirecta.com' : 'http://localhost:3000',
    AUTH_URL: isProd ? 'https://auth.hirecta.com' : 'http://localhost:3001',
    EDITOR_URL: isProd ? 'https://edit.hirecta.com' : 'http://localhost:3002',
};
