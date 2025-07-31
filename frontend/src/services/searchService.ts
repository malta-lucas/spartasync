// src/services/searchService.ts

import api from './api'; // importa a instância já configurada

export interface SearchResults {
  tags: {
    count: number;
    page: number;
    page_size: number;
    results: Array<{ id: number; title: string; color: string }>;
  };
  contacts: {
    count: number;
    page: number;
    page_size: number;
    results: Array<{ id: number; name: string; email: string }>;
  };
  // ...adicione outros tipos conforme o backend
}

export async function globalSearch(
  term: string,
  tags_page = 1,
  contacts_page = 1,
  page_size = 10
): Promise<SearchResults> {
  // Agora só chama a rota relativa, o token vai automático
  const response = await api.get<SearchResults>('/search/', {
    params: { term, tags_page, contacts_page, page_size }
  });
  return response.data;
}
