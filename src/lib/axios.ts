import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/v1/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true // CORS için önemli
});

export default instance; 