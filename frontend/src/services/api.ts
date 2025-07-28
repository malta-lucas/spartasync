import axios from 'axios';

// Use a variável de ambiente para a URL da API ou padrão localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/';

const api = axios.create({
  baseURL: API_URL,
});

// Interceptor para adicionar o token JWT automaticamente nas requisições autenticadas
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
