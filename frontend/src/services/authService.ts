import api from './api'; // Seu axios customizado
import axios from 'axios';

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
  username: string;
  password: string;
  company?: string;
}

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
export async function registerCompany(data: RegisterCompanyData): Promise<any> {
  const response = await axios.post(`${API_URL}register-company/`, data);
  return response.data;
}

export async function login(data: LoginData): Promise<{ user: AuthResponse['user'], token: string }> {
  // O Axios infere o tipo pelo <AuthResponse>
  const response = await axios.post<AuthResponse>(`${API_URL}auth/login/`, data);

  const accessToken = response.data.access ?? '';
  if (!accessToken) throw new Error('Token de acesso não recebido');

  const profile = await axios.get<AuthResponse['user']>(`${API_URL}auth/me/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return {
    user: profile.data,
    token: accessToken,
  };
}

// ---- LOGOUT ----
export function logout() {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
}