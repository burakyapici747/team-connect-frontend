import 'next-auth';
import type { User } from './auth';

declare module 'next-auth' {
  interface Session {
    user: User | null;
  }
} 