import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authService } from '@/services/auth.service';
import type { User } from '@/types/auth';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password required');
        }

        try {
          // Backend'e login isteği at, bu işlem httpOnly cookie set edecek
          await authService.login({
            email: credentials.email,
            password: credentials.password,
          });

          // Cookie set edildikten sonra user bilgilerini al
          const user = await authService.getAuthenticatedUser();
          return user;
        } catch (error: any) {
          throw new Error(error.message || 'Authentication failed');
        }
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      try {
        // Her session isteğinde güncel user bilgisini al
        const user = await authService.getAuthenticatedUser();
        session.user = user;
      } catch (error) {
        session.user = null;
      }
      return session;
    }
  },
  events: {
    async signOut() {
      try {
        await authService.logout();
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
  },
  pages: {
    signIn: '/login',
    error: '/login'
  }
});

export { handler as GET, handler as POST }; 