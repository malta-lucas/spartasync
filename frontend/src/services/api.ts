// src/services/api.ts

import axios from 'axios';

// Usa a variável do Vite (.env)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Cria uma instância Axios configurada
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Intercepta toda requisição para adicionar Authorization se houver token salvo
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // ou 'accessToken' se for esse o nome
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
