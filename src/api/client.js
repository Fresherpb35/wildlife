// src/api/client.js


// src/api/client.js
const API_URL = import.meta.env.VITE_API_URL;

// Agar variable missing hai toh console mein saaf dikhega
if (!API_URL) {
  console.error("❌ CRITICAL: VITE_API_URL is undefined in this build!");
}

const BASE_URL = `${(API_URL || '').replace(/\/$/, '')}/api`;


console.log("🚀 Running API on:", BASE_URL); 

export function getToken()      { return localStorage.getItem('safari_admin_token'); }
export function setToken(token)     { localStorage.setItem('safari_admin_token', token); }
export function removeToken()       { localStorage.removeItem('safari_admin_token'); }

async function request(method, path, body = null, options = {}) {
  const headers = { 'Content-Type': 'application/json' };
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const config = {
    method,
    headers,
    ...options,
  };

  if (body) config.body = JSON.stringify(body);

  // path yahan "/bookings" jaisa hoga
  const response = await fetch(`${BASE_URL}${path}`, config);
  
  let data = {};
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    data = await response.json();
  }

  if (!response.ok) {
    const errorMsg = data.message || 'Validation failed';
    const err = new Error(errorMsg);
    err.status = response.status;
    err.data = data; 
    err.errors = data.errors || (data.error ? [data.error] : null);
    err.response = { data, status: response.status }; 
    throw err;
  }

  return data;
}

const api = {
  get:    (path)         => request('GET',    path),
  post:   (path, body)   => request('POST',   path, body),
  patch:  (path, body)   => request('PATCH',  path, body),
  delete: (path)         => request('DELETE', path),
};

export default api;