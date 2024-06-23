import { NextResponse, NextRequest } from 'next/server';
import getCookieForServer from './utils/getCookieForServer';

export function middleware(request: NextRequest) {
  const isAuthenticated = getCookieForServer('accessToken', request);

  // If the user is authenticated, continue as normal
  if (isAuthenticated) {
    return NextResponse.next();
  }

  // Redirect to login page if not authenticated
  return NextResponse.redirect(new URL('/signin', request.url));
}

export const config = {
  matcher: ['/my-page', '/admin', '/my-course', '/course/:path*'],
};
