import { fetchJson, API_ROOT } from '.';
import { Customer, CustomerDetails } from '../types';
import { getDefinedKeys } from '../utils/objects';

export async function fetchCustomers(page: string, size: string, search?: string) {
  const params = getDefinedKeys({ page, size, search });
  const query = new URLSearchParams(params as Record<string, string>).toString();
  return await fetchJson<{ total: number; results: Customer[]; }>(`${API_ROOT}/customers?${query}`);
}

export async function fetchCustomerDetails(id: string) {
  return await fetchJson<CustomerDetails>(`${API_ROOT}/customers/${id}`);
}

export async function createCustomer(body: { name: string; email?: string; phone?: string; }) {
  return await fetchJson<CustomerDetails>(`${API_ROOT}/customers`, {
    method: 'POST',
    body
  });
}

export async function updateCustomer(id: string, body: Partial<CustomerDetails>) {
  return await fetchJson<CustomerDetails>(`${API_ROOT}/customers/${id}`, {
    method: 'PATCH',
    body
  });
}