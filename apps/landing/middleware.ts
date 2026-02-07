import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Check if the request is HTTP (not HTTPS)
    const proto = request.headers.get('x-forwarded-proto');

    // If in production and using HTTP, redirect to HTTPS
    if (
        process.env.NODE_ENV === 'production' &&
        proto === 'http'
    ) {
        const url = request.nextUrl.clone();
        url.protocol = 'https:';
        return NextResponse.redirect(url, 301); // Permanent redirect
    }

    return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
    matcher: '/:path*',
};
