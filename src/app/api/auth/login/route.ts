import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import axios from '@/lib/axios';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Backend'e login isteği at
    const response = await axios.post('/auth/login', body);
    const { token, user } = response.data;

    // Cookie'yi set et
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
      maxAge: 7 * 24 * 60 * 60, // 7 gün
      path: '/',
    };

    // Response oluştur ve cookie'yi ekle
    const nextResponse = NextResponse.json({ user });
    nextResponse.cookies.set('token', token, cookieOptions);

    return nextResponse;
  } catch (error: any) {
    return NextResponse.json(
      { message: error.response?.data?.message || 'Giriş yapılırken bir hata oluştu' },
      { status: error.response?.status || 500 }
    );
  }
} 