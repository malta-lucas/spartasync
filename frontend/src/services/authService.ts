import api from './api'; // Importa o api.ts já com interceptor de token
import axios from 'axios'; // Usado apenas para login/register que ainda não tem token

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/';

export interface RegisterCompanyData {
  company_name: string;
  company_type?: string;
  admin_email: string;
  admin_phone?: string;
  password: string;
  accept_promo?: boolean;
}

export interface LoginData {
  username: string;  // Aqui pode ser email, telefone ou username, dependendo do seu backend
  password: string;
}

// Caso queira tipar o response (opcional)
export interface AuthResponse {
  refresh?: string;
  access?: string;
  token?: string;
  user?: {
    id: number;
    username: string;
    email: string;
    company: { id: number; name: string };
    role: { id: number; name: string };
  };
}

// Cadastro de empresa + usuário admin (normalmente não exige token)
export async function registerCompany(data: RegisterCompanyData) {
  // Pode usar api.post ou axios.post, ambos funcionam aqui
  const response = await axios.post(`${API_URL}register-company/`, data);
  return response.data;
}

// Login com JWT (retorna access e refresh)
export async function login(data: LoginData) {
  const response = await axios.post<AuthResponse>(`${API_URL}auth/login/`, data);
  return response.data;
}
