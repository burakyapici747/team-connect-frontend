import axios from '../lib/axios';

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface AuthResponse {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export const authService = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await axios.post<AuthResponse>('/api/auth/login', data);
    return response.data;
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await axios.post<AuthResponse>('/api/auth/register', data);
    return response.data;
  },

  async logout() {
    await axios.post('/api/auth/logout');
    window.location.href = '/login';
  },

  async isAuthenticated() {
    try {
      await axios.get('/api/auth/check');
      return true;
    } catch {
      return false;
    }
  }
}; 