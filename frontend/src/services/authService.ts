import axios from 'axios';
import { JwtDecoded, RegisterCompanyData, LoginData } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/';


type LoginResponse = {
  access: string;
  refresh: string;
};

export function decodeJwt(token: string): JwtDecoded | null {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

export function getCurrentUser(): JwtDecoded | null {
  const token = localStorage.getItem('token');
  if (!token) return null;
  return decodeJwt(token);
}

export async function registerCompany(data: RegisterCompanyData): Promise<any> {
  const response = await axios.post(`${API_URL}register-company/`, data);
  return response.data;
}

export async function login(data: LoginData): Promise<{ token: string, refresh: string, user: JwtDecoded | null }> {
  try {
    const response = await axios.post<LoginResponse>(`${API_URL}auth/login/`, data);

    const accessToken = response.data.access ?? '';
    const refreshToken = response.data.refresh ?? '';

    if (!accessToken) throw new Error('Token de acesso não recebido');

    const user = decodeJwt(accessToken);

    localStorage.setItem('token', accessToken);
    localStorage.setItem('refresh', refreshToken);

    return {
      token: accessToken,
      refresh: refreshToken,
      user,
    };
  } catch (error) {
    throw new Error("Erro ao realizar login. Verifique suas credenciais.");
  }
}

export async function refreshToken(): Promise<string> {
  const refresh = localStorage.getItem('refresh');
  if (!refresh) throw new Error('Token de refresh não encontrado');

  const response = await axios.post<{ access: string }>(
    `${API_URL}auth/token/refresh/`,
    { refresh }
  );
  const newAccessToken = response.data.access;

  localStorage.setItem('token', newAccessToken);

  return newAccessToken;
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('refresh');
}

export function getAccessToken() {
  return localStorage.getItem('token') || '';
}
