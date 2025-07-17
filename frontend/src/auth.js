// src/auth.js
// import jwt_decode from 'jwt-decode';
import { jwtDecode } from 'jwt-decode';

export function setTokens({ access, refresh }) {
  localStorage.setItem('access_token', access);
  localStorage.setItem('refresh_token', refresh);
}

export function getAccessToken() {
  return localStorage.getItem('access_token');
}

export function logout() {
  localStorage.clear();
}

export function isAuthenticated() {
  const token = getAccessToken();
  if (!token) return false;
  try {
    const decoded = jwtDecode(token); // ✅ fix here
    return decoded.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

