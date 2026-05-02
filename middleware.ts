import { NextRequest, NextResponse } from 'next/server';

const PROTECTED_ROUTES = ['/seller', '/profile', '/orders', '/ai-listing'];
const AUTH_KEY = 'cyberdress_auth';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if route is protected
  const isProtected = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));

  if (!isProtected) return NextResponse.next();

  // Allow /login through
  if (pathname === '/login') return NextResponse.next();

  // Check auth from cookies (same-origin)
  const authCookie = request.cookies.get(AUTH_KEY);
  if (authCookie) {
    try {
      const user = JSON.parse(authCookie.value);
      if (user.loggedIn) return NextResponse.next();
    } catch {
      // invalid cookie, fall through to redirect
    }
  }

  // Not logged in → redirect to login
  const loginUrl = new URL('/login', request.url);
  loginUrl.searchParams.set('redirect', pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
