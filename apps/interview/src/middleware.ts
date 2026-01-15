import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that require authentication
const protectedRoutes = ['/', '/session', '/reports'];



export function middleware(request: NextRequest) {
    const { pathname, searchParams } = request.nextUrl;


    // Check if the route needs protection
    const isProtectedRoute = protectedRoutes.some(route =>
        pathname === route || pathname.startsWith(route + '/')
    );

    if (!isProtectedRoute) {
        return NextResponse.next();
    }

    // Get the token from cookies
    const token = request.cookies.get('token')?.value || searchParams.get('token');

    // If no token, redirect to auth
    if (!token) {
        const authUrl = new URL('https://auth.profresume.com');
        // Add current URL as redirect parameter
        authUrl.searchParams.set('redirect', "https://interview.profresume.com");
        return NextResponse.redirect(authUrl);
    }

    // Token exists, allow access
    return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files (images, etc)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
