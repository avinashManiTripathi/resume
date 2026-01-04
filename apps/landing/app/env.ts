export const getEnv = (key: string) => {
    return process.env[key] || ''
}

export const ENV = {
    API_URL: getEnv('API_URL'),
    AUTH_URL: getEnv('AUTH_URL'),
    EDITOR_URL: getEnv('EDITOR_URL'),
}