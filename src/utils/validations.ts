import { Customer } from '../types';

export function validateCustomer(customer: Partial<Customer>) {
  if (!customer?.name?.trim()) {
    return 'Nome não informado';
  }

  if (!customer?.phone?.trim() && !customer.email?.trim()) {
    return 'Email ou telefone não informado';
  }

  return null;
}