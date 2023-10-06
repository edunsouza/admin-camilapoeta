import { create } from 'zustand';
import { ApiError, Customer, Pagination, Sizing } from '../types';
import { getDefinedKeys } from '../utils/objects';
import * as customersService from '../services/customers';

interface DraftCustomer extends Customer {
  sizing: Partial<Sizing>;
}

type State = {
  total: number,
  customers: Customer[],
  draftCustomer: Partial<DraftCustomer> | null;
  pagination: Pagination,
  loading: boolean,
  error: string | null;
  draftSaved: boolean;
}

export const useCustomers = create<State>(() => ({
  total: 0,
  customers: [],
  draftCustomer: null,
  pagination: { page: '1', size: '20', search: '' },
  loading: false,
  error: null,
  draftSaved: true
}));

const set = useCustomers.setState;
// const get = useCustomers.getState;

// --- actions ---

export async function fetchCustomers({ page, size, search }: Pagination) {
  try {
    set({ loading: true, error: null });
    const { results, total } = await customersService.fetchCustomers(page, size, search);
    setCustomers(results, total);
  } catch (error) {
    if (error instanceof ApiError) {
      set({ error: error.message });
    }
  } finally {
    set({ loading: false });
  }
}

export async function fetchCustomerDetails(id: string) {
  try {
    set({ loading: true, error: null });
    const { sizing, ...details } = await customersService.fetchCustomerDetails(id);
    setDraftCustomer({
      id: details.id,
      name: details.name,
      email: details.email,
      phone: details.phone,
      sizing: {
        id: sizing.id,
        arm: sizing.arm,
        back: sizing.back,
        bust: sizing.bust,
        bustHeight: sizing.bustHeight,
        cleavage: sizing.cleavage,
        crotch: sizing.crotch,
        hip: sizing.hip,
        sleeve: sizing.sleeve,
        waist: sizing.waist,
        bodyLength: sizing.bodyLength,
        pantsLength: sizing.pantsLength,
        skirtLength: sizing.skirtLength,
      }
    });
  } catch (error) {
    if (error instanceof ApiError) {
      set({ error: error.message });
    }
  } finally {
    set({ loading: false });
  }
}

export function setPagination(pagination: Partial<Pagination>) {
  const current = getDefinedKeys(pagination);
  set(({ pagination: previous }) => ({
    pagination: {
      page: previous.search !== current.search ? '1' : previous.page,
      size: previous.size,
      search: previous.search,
      ...current
    }
  }));
}

export function setCustomers(customers: Customer[], total?: number) {
  set({ customers, total: total ?? customers.length });
}

export function insertCustomer(customer: Customer) {
  set(({ customers }) => ({ customers: [...customers, customer] }));
}

export function updateCustomer(updates: Partial<Customer> & { id: Customer['id'] }) {
  set(({ customers }) => ({
    customers: customers.map(customer => {
      if (customer.id === updates.id) {
        return { ...customer, ...updates };
      }
      return customer;
    })
  }));
}

export function setDraftSaved(draftSaved: boolean) {
  set({ draftSaved });
}

export function setDraftCustomer(customer: DraftCustomer) {
  setDraftSaved(true);
  set(() => ({ draftCustomer: customer }));
}

export function updateDraftCustomer(updates: Partial<Omit<DraftCustomer, 'id' | 'sizing'>>) {
  setDraftSaved(false);
  set(({ draftCustomer }) => ({ draftCustomer: { ...draftCustomer, ...updates } }));
}

export function updateCustomerSizing(sizing: Partial<Sizing>) {
  setDraftSaved(false);
  set(({ draftCustomer }) => ({
    draftCustomer: {
      ...draftCustomer,
      sizing: { ...draftCustomer?.sizing, ...sizing }
    }
  }));
}