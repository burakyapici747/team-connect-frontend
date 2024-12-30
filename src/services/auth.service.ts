import axios from '../lib/axios';

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  lastName: string;
}

export const authService = {
  async login(data: LoginRequest): Promise<void> {
    await axios.post('/auth', data);
  },

  async register(data: RegisterRequest): Promise<void> {
    await axios.post('/auth/register', data);
  },

  async logout() {
    await axios.post('/auth/logout');
  },
  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await axios.get<{ data: User }>('/users/me');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching current user:', error);
      return null;
    }
  },
  async isAuthenticated(): Promise<boolean> {
    try {
      const user = await this.getCurrentUser();
      return !!user;
    } catch {
      return false;
    }
  }
}; 