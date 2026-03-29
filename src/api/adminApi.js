// ─── ADMIN API ────────────────────────────────────────────────────────────────
// src/api/adminApi.js
import api, { setToken, removeToken } from './client';

/**
 * Login as admin — stores JWT in localStorage.
 * @param {{ email: string, password: string }} credentials
 * @returns {{ success: boolean, token: string, admin: object }}
 */
export async function adminLogin(credentials) {
  const data = await api.post('/admin/login', credentials);
  if (data.token) setToken(data.token);
  return data;
}

export function adminLogout() {
  removeToken();
}

export function getAdminMe() {
  return api.get('/admin/me');
}

export function getDashboard() {
  return api.get('/admin/dashboard');
}
