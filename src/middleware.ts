import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Auth gerektiren route'lar
const protectedRoutes = ['/chat', '/team', '/meeting', '/profile'];

// Sadece non-auth kullanıcılar için route'lar
const authRoutes = ['/login', '/register', '/forgot-password'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Cookie kontrolü
  const hasCookie = request.cookies.has('jwt'); // backend'deki cookie adına göre değiştirin

  // Auth gerektiren route'lara erişim kontrolü
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!hasCookie) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Auth sayfalarına erişim kontrolü (login, register vs.)
  if (authRoutes.some(route => pathname.startsWith(route))) {
    if (hasCookie) {
      // Kullanıcı zaten authenticate olmuşsa chat sayfasına yönlendir
      return NextResponse.redirect(new URL('/chat', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Auth gerektiren route'lar
    '/chat/:path*',
    '/team/:path*',
    '/meeting/:path*',
    '/profile/:path*',
    // Auth sayfaları
    '/login',
    '/register',
    '/forgot-password',
  ]
}; 