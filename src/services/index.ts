import { ApiError } from '../types';

export const API_ROOT = import.meta.env.VITE_API_ROOT;

export { fetchCustomers } from './customers';

type RequestData = {
  headers?: Record<string, string>,
  body?: Record<string, unknown>,
  method?: 'PUT' | 'POST' | 'DELETE' | 'GET' | 'PATCH'
};

export const fetchJson = async <T>(url: string, data?: RequestData): Promise<T> => {
  const auth = localStorage.getItem('auth-token');

  const response = await fetch(url, {
    headers: {
      Authorization: auth ?? '',
      'Content-Type': 'application/json',
      ...data?.headers,
    },
    body: data?.body ? JSON.stringify(data.body) : null,
    method: data?.method || 'GET'
  });

  const content = await response.json();

  if (!response.ok) {
    // todo: refresh token and retry
    throw new ApiError(content, response.status);
  }

  return content;
};