import { ApiError } from '../types';

export const API_ROOT = import.meta.env.VITE_API_ROOT;

export { fetchCustomers } from './customers';

export const fetchJson = async <T>(url: string, headers?: Record<string, string>): Promise<T> => {
  const auth = localStorage.getItem('auth-token');
  const response = await fetch(url, { headers: { ...headers, Authorization: auth ?? '' } });
  const content = await response.json();

  if (!response.ok) {
    // todo: refresh token and retry
    throw new ApiError(content.message ?? content, response.status);
  }

  return content;
};