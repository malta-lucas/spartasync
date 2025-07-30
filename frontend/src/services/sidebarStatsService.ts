// src/services/sidebarStatsService.ts

import api from './api';

export async function fetchSidebarStats() {
  const { data } = await api.get('/sidebar-stats/');
  return data;
}