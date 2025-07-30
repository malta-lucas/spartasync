// src/services/hierarquiaService.js
import axios from "axios";

const API_URL = "http://localhost:8080";

// Listar todas as hierarquias (roles)
export async function listHierarquias() {
  const res = await axios.get(`${API_URL}/api/roles/`);
  if (Array.isArray(res.data)) return res.data;
  if (Array.isArray(res.data.results)) return res.data.results;
  return [];
}

// Buscar uma hierarquia pelo ID
export async function getHierarquia(id) {
  const res = await axios.get(`${API_URL}/api/roles/${id}/`);
  return res.data;
}

// Criar nova hierarquia (role)
export async function createHierarquia(payload) {
  const res = await axios.post(`${API_URL}/api/roles/`, payload);
  return res.data;
}

// Atualizar hierarquia (role)
export async function updateHierarquia(id, payload) {
  const res = await axios.put(`${API_URL}/api/roles/${id}/`, payload);
  return res.data;
}

// Excluir uma hierarquia
export async function deleteHierarquia(id) {
  await axios.delete(`${API_URL}/api/roles/${id}/`);
}
