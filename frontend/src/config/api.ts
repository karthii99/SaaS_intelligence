/**
 * API Configuration
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const API_URL = API_BASE_URL;

export const ENDPOINTS = {
  CLIENTS: `${API_BASE_URL}/api/clients`,
  CLIENT_DETAIL: (id: string) => `${API_BASE_URL}/api/clients/${id}`,
  HEALTH: `${API_BASE_URL}/health`
};

export default API_BASE_URL;
