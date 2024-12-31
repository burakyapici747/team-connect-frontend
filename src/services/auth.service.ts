import axios from '@/lib/axios';
import { LoginRequest, RegisterRequest, User, AuthError } from '@/types/auth';

class AuthService {
  async login(data: LoginRequest): Promise<void> {
    try {
      await axios.post('/auth', data);
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async register(data: RegisterRequest): Promise<void> {
    try {
      await axios.post('/users', data);
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async logout(): Promise<void> {
    try {
      await axios.post('/auth/logout');
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async getAuthenticatedUser(): Promise<User> {
    try {
      const response = await axios.get<{ data: User }>('/users/me');
      return response.data.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any): AuthError {
    const message = error.response?.data?.message || 'An unexpected error occurred';
    const code = error.response?.data?.code;
    return { message, code };
  }
}

export const authService = new AuthService(); 