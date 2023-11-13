import { fetchJson, API_ROOT } from '.';
import { Customer, CustomerDetails } from '../types';
import { getDefinedKeys } from '../utils/objects';

type CustomerDetailsAPI = {
  id: string;
  size_id: string;
  name: string;
  phone: string;
  email: string;
  bust: string;
  waist: string;
  hip: string;
  back: string;
  cleavage: string;
  arm: string;
  sleeve: string;
  crotch: string;
  bust_height: string;
  body_length: string;
  skirt_length: string;
  pants_length: string;
};

const transformAPIResponse = (response: CustomerDetailsAPI): CustomerDetails => {
  const { id, size_id, bust_height, body_length, skirt_length, pants_length, ...rest } = response;
  return {
    ...rest,
    id,
    sizeId: size_id,
    bustHeight: bust_height,
    bodyLength: body_length,
    skirtLength: skirt_length,
    pantsLength: pants_length
  };
};

const transformAPIRequest = (request: CustomerDetails): CustomerDetailsAPI => {
  const { sizeId, bodyLength, bustHeight, pantsLength, skirtLength, ...rest } = request;
  return {
    ...rest,
    size_id: sizeId,
    body_length: bodyLength,
    bust_height: bustHeight,
    pants_length: pantsLength,
    skirt_length: skirtLength
  };
};

export async function fetchCustomers(page: string, size: string, search?: string) {
  const params = getDefinedKeys({ page, size, search });
  const query = new URLSearchParams(params as Record<string, string>).toString();
  return await fetchJson<{ total: number; results: Customer[]; }>(`${API_ROOT}/customers?${query}`);
}

export async function fetchCustomerDetails(id: string): Promise<CustomerDetails> {
  const repsonse = await fetchJson<CustomerDetailsAPI>(`${API_ROOT}/customers/${id}`);
  return transformAPIResponse(repsonse);
}

export async function createCustomer(body: { name: string; email?: string; phone?: string; }) {
  return await fetchJson<CustomerDetails>(`${API_ROOT}/customers`, {
    method: 'POST',
    body
  });
}

export async function updateCustomer(id: string, updates: Partial<CustomerDetails>) {
  const response = await fetchJson<CustomerDetailsAPI>(`${API_ROOT}/customers/${id}`, {
    method: 'PATCH',
    body: transformAPIRequest(updates as CustomerDetails)
  });

  return transformAPIResponse(response);
}