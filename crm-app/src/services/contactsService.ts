// src/services/contactsService.ts

import axios from "axios";

// Defina o endereço da sua API
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api/contacts/";

// Tipo dos contatos (ajuste se necessário)
export interface Contact {
  id?: string;
  number: string;
  isBusiness: boolean;
  pushname: string;
  type: string;
  isMe: boolean;
  isUser: boolean;
  isGroup: boolean;
  isWAContact: boolean;
  isMyContact: boolean;
  isBlocked: boolean;
  created_at?: string;
  updated_at?: string;
  user_id?: number;
}

// Listar todos os contatos
export async function getContacts() {
  const response = await axios.get<Contact[]>(API_URL);
  return response.data;
}

// Criar um novo contato
export async function createContact(contact: Contact) {
  const response = await axios.post<Contact>(API_URL, contact);
  return response.data;
}

// Atualizar um contato existente
export async function updateContact(contactId: string, contact: Partial<Contact>) {
  const response = await axios.put<Contact>(`${API_URL}${contactId}/`, contact);
  return response.data;
}

// Deletar um contato
export async function deleteContact(contactId: string) {
  await axios.delete(`${API_URL}${contactId}/`);
}

// Bulk create (criar vários contatos de uma vez)
export async function bulkCreateContacts(contacts: Contact[]) {
  const response = await axios.post(`${API_URL}bulk/`, { contacts });
  return response.data;
}
