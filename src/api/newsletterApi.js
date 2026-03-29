// ─── NEWSLETTER API ───────────────────────────────────────────────────────────
// src/api/newsletterApi.js
import api from './client';

/**
 * Subscribe an email to the newsletter.
 * Called from BlogPage.jsx newsletter section.
 *
 * @param {string} email
 * @returns {{ success: boolean, message: string }}
 */
export function subscribeNewsletter(email) {
  return api.post('/newsletter/subscribe', { email });
}

/**
 * Unsubscribe an email from the newsletter.
 * @param {string} email
 */
export function unsubscribeNewsletter(email) {
  return api.post('/newsletter/unsubscribe', { email });
}

// Admin
export function getSubscribers(params = {}) {
  const qs = new URLSearchParams(params).toString();
  return api.get(`/newsletter${qs ? `?${qs}` : ''}`);
}
