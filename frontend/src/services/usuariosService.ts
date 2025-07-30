// src/services/usuariosService.js (ou .ts)
import api from "./api"; // usa o client já com token

// Listar todos os usuários
export async function listUsers() {
  const res = await api.get("/users/");
  if (Array.isArray(res.data)) return res.data;
  if (Array.isArray(res.data.results)) return res.data.results;
  return [];
}

// Buscar usuário pelo ID
export async function getUser(id) {
  const res = await api.get(`/users/${id}/`);
  return res.data;
}

// Criar novo usuário
export async function createUser(payload) {
  const res = await api.post("/users/", payload);
  return res.data;
}

// Atualizar usuário existente
export async function updateUser(id, payload) {
  const res = await api.put(`/users/${id}/`, payload);
  return res.data;
}

// Excluir usuário
export async function deleteUser(id) {
  await api.delete(`/users/${id}/`);
}

// Listar todas as roles/hierarquias (papéis)
export async function listRoles() {
  const res = await api.get("/roles/");
  if (Array.isArray(res.data)) return res.data;
  if (Array.isArray(res.data.results)) return res.data.results;
  return [];
}
