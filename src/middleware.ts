import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Auth gerektiren sayfalar
const protectedRoutes = ['/chat', '/profile', '/settings'];
// Auth gerektirmeyen sayfalar
const authRoutes = ['/login', '/register', '/forgot-password'];

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  // Auth gerektiren sayfalara erişim kontrolü
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Giriş yapmış kullanıcının auth sayfalarına erişim kontrolü
  if (authRoutes.some(route => pathname.startsWith(route))) {
    if (token) {
      const chatUrl = new URL('/chat', request.url);
      return NextResponse.redirect(chatUrl);
    }
  }

  return NextResponse.next();
}

// Middleware'in çalışacağı path'leri belirle
export const config = {
  matcher: [
    '/chat/:path*',
    '/profile/:path*',
    '/settings/:path*',
    '/login',
    '/register',
    '/forgot-password',
  ],
}; 