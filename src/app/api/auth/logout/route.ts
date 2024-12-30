import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  // Cookie'yi sil
  const response = NextResponse.json({ success: true });
  response.cookies.delete('token');
  
  return response;
} 