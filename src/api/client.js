// src/api/client.js
const BASE_URL = process.env.REACT_APP_API_URL + '/api' || 'http://localhost:5000/api';

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

  const response = await fetch(`${BASE_URL}${path}`, config);
  
  // 1. Safely parse JSON
  let data = {};
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    data = await response.json();
  }

  // 2. Handle Errors (like 422)
  if (!response.ok) {
    // Create the error object
    const errorMsg = data.message || 'Validation failed';
    const err = new Error(errorMsg);
    
    // Attach status and data so BookingPage.jsx catch block can see it
    err.status = response.status;
    err.data = data; 
    
    // Specifically extract the 'errors' array if it exists (for 422 errors)
    // This allows you to do: err.errors[0].message
    err.errors = data.errors || (data.error ? [data.error] : null);
    
    // Keep this for Axios compatibility if needed
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