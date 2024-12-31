import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/v1/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true // Cookie'lerin gönderilmesi için gerekli
});

// Response interceptor - unauthorized durumunda login'e yönlendir
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default instance; 