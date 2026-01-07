export const getEnv = (key: string) => {
    return process.env[key] || process.env[`NEXT_PUBLIC_${key}`] || ''
}

export const ENV = {
    API_URL: getEnv('API_URL') || 'http://localhost:4000/api',
    AUTH_URL: getEnv('AUTH_URL') || 'http://localhost:3001',
    EDITOR_URL: getEnv('EDITOR_URL') || 'http://localhost:3002',
}