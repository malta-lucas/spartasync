// src/services/wahaService.ts
import api from './api';

// Base do endpoint (será concatenado ao baseURL do api.ts)
const WAHA_BASE = 'waha';

// SESSIONS
export const listSessions = () => api.get(`/${WAHA_BASE}/sessions/`);

export const createSession = (data: object) =>
  api.post(`/${WAHA_BASE}/sessions/`, data);

export const startSession = (session: string = "default") =>
  api.post(`/${WAHA_BASE}/sessions/start/`, null, { params: { session } });

export const stopSession = (session: string = "default") =>
  api.post(`/${WAHA_BASE}/sessions/stop/`, null, { params: { session } });

export const getQr = (session: string = "default") =>
  api.get(`/${WAHA_BASE}/sessions/qr/`, { params: { session, format: "raw" } });

// MESSAGES
export const sendText = (payload: object) =>
  api.post(`/${WAHA_BASE}/messages/send/`, payload);

export const getMessages = (session: string = "default", chatId: string) =>
  api.get(`/${WAHA_BASE}/messages/`, {
    params: { session, chatId, limit: 50, downloadMedia: "false" }
  });

// CONTACTS
export const listContacts = (session: string = "default") =>
  api.get(`/${WAHA_BASE}/contacts/`, { params: { session } });

export const checkContact = (session: string = "default", phone: string) =>
  api.get(`/${WAHA_BASE}/contacts/check/`, { params: { session, phone } });

export const getContactAbout = (session: string = "default", contactId: string) =>
  api.get(`/${WAHA_BASE}/contacts/about/`, { params: { session, contactId } });

export const getProfilePicture = (session: string = "default", contactId: string) =>
  api.get(`/${WAHA_BASE}/contacts/photo/`, { params: { session, contactId } });

export const blockContact = (payload: object) =>
  api.post(`/${WAHA_BASE}/contacts/block/`, payload);

export const unblockContact = (payload: object) =>
  api.post(`/${WAHA_BASE}/contacts/unblock/`, payload);

// Exemplo para outros endpoints:
// export const getCallLog = () => api.get(`/${WAHA_BASE}/call-log/`);
