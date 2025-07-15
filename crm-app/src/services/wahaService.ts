import axios from "axios";

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

axios.defaults.withCredentials = true;

axios.interceptors.request.use(config => {
  if (config.method?.toLowerCase() === 'post' || config.method?.toLowerCase() === 'put' || config.method?.toLowerCase() === 'delete') {
    const csrftoken = getCookie('csrftoken');
    if (csrftoken) {
      config.headers['X-CSRFToken'] = csrftoken;
    }
  }
  return config;
});

const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8080/api/waha";

// SESSIONS
export const listSessions = () => axios.get(`${API_BASE}/sessions/`);

export const createSession = (data: object) =>
  axios.post(`${API_BASE}/sessions/`, data);

export const startSession = (session: string = "default") =>
  axios.post(`${API_BASE}/sessions/start/`, null, { params: { session } });

export const stopSession = (session: string = "default") =>
  axios.post(`${API_BASE}/sessions/stop/`, null, { params: { session } });

export const getQr = (session: string = "default") =>
  axios.get(`${API_BASE}/sessions/qr/`, { params: { session, format: "raw" } });

// MESSAGES
export const sendText = (payload: object) =>
  axios.post(`${API_BASE}/messages/send/`, payload);

export const getMessages = (session: string = "default", chatId: string) =>
  axios.get(`${API_BASE}/messages/`, {
    params: { session, chatId, limit: 50, downloadMedia: "false" }
  });

// CONTACTS
export const listContacts = (session: string = "default") =>
  axios.get(`${API_BASE}/contacts/`, { params: { session } });

export const checkContact = (session: string = "default", phone: string) =>
  axios.get(`${API_BASE}/contacts/check/`, { params: { session, phone } });

export const getContactAbout = (session: string = "default", contactId: string) =>
  axios.get(`${API_BASE}/contacts/about/`, { params: { session, contactId } });

export const getProfilePicture = (session: string = "default", contactId: string) =>
  axios.get(`${API_BASE}/contacts/photo/`, { params: { session, contactId } });

export const blockContact = (payload: object) =>
  axios.post(`${API_BASE}/contacts/block/`, payload);

export const unblockContact = (payload: object) =>
  axios.post(`${API_BASE}/contacts/unblock/`, payload);

// CALLLOG (exemplo)
// export const getCallLog = () => axios.get(`${API_BASE}/call-log/`);
