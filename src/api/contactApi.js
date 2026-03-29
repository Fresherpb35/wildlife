// ─── CONTACT API ──────────────────────────────────────────────────────────────
// src/api/contactApi.js
import api from './client';

// ── PUBLIC ────────────────────────────────────────────────────────────────────

/**
 * Submit a contact form message.
 * Called from ContactPage.jsx on form submit.
 *
 * @param {{ name: string, email: string, message: string }} formData
 * @returns {{ success: boolean, message: string }}
 */
export function submitContact(formData) {
  return api.post('/contacts', {
    name:    formData.name,
    email:   formData.email,
    message: formData.message,
  });
}

// ── ADMIN ─────────────────────────────────────────────────────────────────────

export function getContacts(params = {}) {
  const qs = new URLSearchParams(params).toString();
  return api.get(`/contacts${qs ? `?${qs}` : ''}`);
}

export function getContactById(id) {
  return api.get(`/contacts/${id}`);
}

export function updateContactStatus(id, status) {
  return api.patch(`/contacts/${id}/status`, { status });
}

export function deleteContact(id) {
  return api.delete(`/contacts/${id}`);
}
