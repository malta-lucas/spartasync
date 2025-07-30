// utils/auth.ts (ou pode ser no authService.ts mesmo)

import { JwtDecoded } from '../types'; // ou seu tipo

export function decodeJwt(token: string): JwtDecoded | null {
  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch {
    return null;
  }
}

export function getCurrentUser(): JwtDecoded | null {
  const token = localStorage.getItem('token');
  if (!token) return null;
  return decodeJwt(token);
}
