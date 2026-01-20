export const getEnv = (key: string) => {
    return process.env[key] || process.env[`NEXT_PUBLIC_${key}`] || ''
}

export const ENV = {
    API_URL: getEnv('API_URL') || 'https://api.hirecta.com',
    AUTH_URL: getEnv('AUTH_URL') || 'https://auth.hirecta.com',
    EDITOR_URL: getEnv('EDITOR_URL') || 'https://edit.hirecta.com',
    INTERVIEW_URL: getEnv('INTERVIEW_URL') || 'https://interview.hirecta.com',
    BASE_URL: getEnv('BASE_URL') || 'https://hirecta.com',
    SUPPORT_EMAIL: getEnv('SUPPORT_EMAIL') || 'it@hirecta.com',
    ACCESSIBILITY_EMAIL: getEnv('ACCESSIBILITY_EMAIL') || 'accessibility@hirecta.com',
    LEGAL_EMAIL: getEnv('LEGAL_EMAIL') || 'legal@hirecta.com',
    PRIVACY_EMAIL: getEnv('PRIVACY_EMAIL') || 'privacy@hirecta.com',
    SECURITY_EMAIL: getEnv('SECURITY_EMAIL') || 'security@hirecta.com',
    ENTERPRISE_EMAIL: getEnv('ENTERPRISE_EMAIL') || 'enterprise@hirecta.com',
}