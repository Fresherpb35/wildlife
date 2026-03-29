// ─── BOOKING API ──────────────────────────────────────────────────────────────
import api from './client';

// ── PUBLIC ────────────────────────────────────────────────────────────────────

/**
 * Submit a safari booking.
 * @param {Object} formData - Data from the React form state
 */
export function submitBooking(formData) {
  // 1. Extract and clean values
  const name = formData.name?.trim();
  const email = formData.email?.trim();
  const phone = formData.phone?.trim() || ""; 
  const date = formData.date || formData.safariDate;
  const zone = formData.zone || formData.safariZone; // Expected: "Zone 1"
  const type = formData.type || formData.safariType;
  const time = formData.time || formData.safariTime;

  // 2. FIX: Ensure Zone matches the exact backend requirement
  // If the backend says "Invalid Zone" when we send "1", 
  // we must ensure it is sent exactly as "Zone 1", "Zone 2", etc.
  let formattedZone = zone?.toString();
  if (formattedZone && !formattedZone.startsWith("Zone ")) {
    formattedZone = `Zone ${formattedZone}`;
  }

  const payload = {
    name,
    email,
    phone,
    safariDate: date, 
    safariType: type?.toUpperCase(),  // "GYPSY" | "CANTER"
    safariTime: time?.toUpperCase(),  // "MORNING" | "EVENING"
    safariZone: formattedZone         // "Zone 1"
  };

  console.log("Submitting with Zone Fix:", payload);

  return api.post('/bookings', payload);
}

// ── ADMIN ─────────────────────────────────────────────────────────────────────

export function getBookings(params = {}) {
  const qs = new URLSearchParams(params).toString();
  return api.get(`/bookings${qs ? `?${qs}` : ''}`);
}

export function getBookingById(id) {
  return api.get(`/bookings/${id}`);
}

export function updateBookingStatus(id, status) {
  return api.patch(`/bookings/${id}/status`, { status });
}

export function deleteBooking(id) {
  return api.delete(`/bookings/${id}`);
}