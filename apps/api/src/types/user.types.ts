export interface User {
    id: string;
    email: string;
    name: string;
    picture: string;
    googleId: string;
    role: 'user' | 'admin';
    createdAt?: Date;
}

export interface JWTPayload {
    userId: string;
    email: string;
    role: 'user' | 'admin';
    iat?: number;
    exp?: number;
}
