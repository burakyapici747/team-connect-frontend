export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  lastName: string;
  role: string;
}

export type AuthError = {
  message: string;
  code?: string;
} 