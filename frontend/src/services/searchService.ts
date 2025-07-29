import axios from 'axios';

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
  const response = await axios.get<SearchResults>('/api/search/', {
    params: { term, tags_page, contacts_page, page_size }
  });
  return response.data;
}
