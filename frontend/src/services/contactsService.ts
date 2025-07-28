// src/services/contactsService.ts
import api from './api'; // Importa o axios já com o interceptor de token

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

// Endereço da sua API (já fica correto pelo baseURL do api.ts)
const ENDPOINT = 'contacts/';

// Listar todos os contatos
export async function getContacts() {
  const response = await api.get<Contact[]>(ENDPOINT);
  return response.data;
}

// Criar um novo contato
export async function createContact(contact: Contact) {
  const response = await api.post<Contact>(ENDPOINT, contact);
  return response.data;
}

// Atualizar um contato existente
export async function updateContact(contactId: string, contact: Partial<Contact>) {
  const response = await api.put<Contact>(`${ENDPOINT}${contactId}/`, contact);
  return response.data;
}

// Deletar um contato
export async function deleteContact(contactId: string) {
  await api.delete(`${ENDPOINT}${contactId}/`);
}

// Bulk create (criar vários contatos de uma vez)
export async function bulkCreateContacts(contacts: Contact[]) {
  const response = await api.post(`${ENDPOINT}bulk/`, { contacts });
  return response.data;
}
