export const getEnv = (key: string) => {
    return process.env[key] || process.env[`NEXT_PUBLIC_${key}`] || ''
}

export const ENV = {
    API_URL: getEnv('API_URL') || 'https://api.profresume.com',
    AUTH_URL: getEnv('AUTH_URL') || 'http://localhost:3001',
    EDITOR_URL: getEnv('EDITOR_URL') || 'http://localhost:3002',
    BASE_URL: getEnv('BASE_URL') || 'https://profresume.com',
    SUPPORT_EMAIL: getEnv('SUPPORT_EMAIL') || 'support@profresume.com',
    ACCESSIBILITY_EMAIL: getEnv('ACCESSIBILITY_EMAIL') || 'accessibility@profresume.com',
    LEGAL_EMAIL: getEnv('LEGAL_EMAIL') || 'legal@profresume.com',
    PRIVACY_EMAIL: getEnv('PRIVACY_EMAIL') || 'privacy@profresume.com',
    SECURITY_EMAIL: getEnv('SECURITY_EMAIL') || 'security@profresume.com',
    ENTERPRISE_EMAIL: getEnv('ENTERPRISE_EMAIL') || 'enterprise@profresume.com',
}