import { fetchJson, API_ROOT } from '.';
import { getDefinedKeys } from '../utils/objects';

// const cached: Record<string, unknown> = {};
// const SEPARATOR = '_.._';
// const setCache = (value: unknown, ...params: unknown[]) => {
//   cached[params.join(SEPARATOR) as keyof object] = value;
// };
// const getCache = (...params: unknown[]) => {
//   return cached[params.join(SEPARATOR) as keyof object];
// }

type CustomersResponse = {
  total: number;
  results: Array<{
    id: string;
    name: string;
    phone: string;
    email: string
  }>;
};

type CustomerDetailsResponse = {
  id: string;
  name: string;
  phone: string;
  email: string
  sizing: {
    id: string;
    bust: string;
    waist: string;
    hip: string;
    back: string;
    cleavage: string;
    arm: string;
    sleeve: string;
    crotch: string;
    bustHeight: string;
    bodyLength: string;
    skirtLength: string;
    pantsLength: string;
  }
};

export const fetchCustomers = async (page: string, size: string, search?: string) => {
  const params = getDefinedKeys({ page, size, search });
  const query = new URLSearchParams(params as Record<string, string>).toString();
  return await fetchJson<CustomersResponse>(`${API_ROOT}/customers?${query}`);
};

export const fetchCustomerDetails = async (id: string) => {
  return await fetchJson<CustomerDetailsResponse>(`${API_ROOT}/customers/${id}`);
};