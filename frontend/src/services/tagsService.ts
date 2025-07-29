// src/services/tagsService.ts
import api from "./api";
import { Tag } from '../types';

export async function listTags(): Promise<Tag[]> {
  const res = await api.get<Tag[]>("tags/");
  return Array.isArray(res.data) ? res.data : [];
}

export async function getTag(id: number): Promise<Tag> {
  const { data } = await api.get<Tag>(`tags/${id}/`);
  return data;
}

export async function createTag(payload: Omit<Tag, "id" | "created_at" | "last_use" | "updated_at" | "contactCount">): Promise<Tag> {
  const { data } = await api.post<Tag>("tags/", payload);
  return data;
}

export async function updateTag(
  id: number, 
  payload: Partial<Omit<Tag, "id" | "created_at" | "last_use" | "updated_at" | "contactCount">>
): Promise<Tag> {
  const { data } = await api.patch<Tag>(`tags/${id}/`, payload);
  return data;
}

export async function deleteTag(id: number): Promise<void> {
  await api.delete(`tags/${id}/`);
}

export async function listTagContacts(tagId: number): Promise<any[]> {
  const { data } = await api.get<{ contacts: any[] }>(`tags/${tagId}/contacts/`);
  return data.contacts ?? [];
}

export async function addTagToContacts(tagId: number, contactIds: number[]): Promise<void> {
  await api.post(`tags/${tagId}/add-contacts/`, { contacts: contactIds });
}

export async function removeTagFromContacts(tagId: number, contactIds: number[]): Promise<void> {
  await api.post(`tags/${tagId}/remove-contacts/`, { contacts: contactIds });
}
