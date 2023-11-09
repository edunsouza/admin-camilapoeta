import { create } from 'zustand';
import { ApiError, Customer, CustomerDetails, Pagination } from '../types';
import { getDefinedKeys } from '../utils/objects';
import * as customersService from '../services/customers';

type State = {
  pagination: Pagination;
  total: number;
  customers: Customer[];
  customersLoading: boolean;
  customersError: string | null;
  draft: Partial<CustomerDetails> & { id: string };
  draftTouched: boolean;
  draftLoading: boolean;
  draftError: string | null;
  newCustomer: Partial<Customer>;
  newCustomerLoading: boolean;
  newCustomerError: string | null;
}

const initialState: State = {
  pagination: { page: '1', size: '20', search: '' },

  total: 0,
  customers: [],
  customersLoading: false,
  customersError: null,

  draft: { id: '' },
  draftTouched: false,
  draftLoading: false,
  draftError: null,

  newCustomer: {},
  newCustomerLoading: false,
  newCustomerError: null
};

export const useCustomers = create<State>(() => initialState);

// const get = useCustomers.getState;
const set = useCustomers.setState;

export function setCustomersLoading(customersLoading: boolean) { set({ customersLoading }); }
export function setCustomersError(customersError: string | null) { set({ customersError }); }
export function setDraftTouched(draftTouched: boolean) { set({ draftTouched }); }
export function setDraftLoading(draftLoading: boolean) { set({ draftLoading }); }
export function setDraftError(draftError: string | null) { set({ draftError }); }
export function setNewCustomerLoading(newCustomerLoading: boolean) { set({ newCustomerLoading }); }
export function setNewCustomerError(newCustomerError: string | null) { set({ newCustomerError }); }

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

// customers

export function setCustomers(customers: Customer[], total?: number) {
  set({ customers, total: total ?? customers.length });
}

export function addCustomer(customer: Customer) {
  set(({ customers }) => ({ customers: [...customers, customer] }));
}

export function replaceCustomer(replacement: Customer) {
  set(({ customers }) => ({
    customers: customers.map(customer => customer.id?.toString() === replacement.id?.toString()
      ? replacement
      : customer
    )
  }));
}

// draft

export function setDraft(draft: CustomerDetails) {
  setDraftTouched(false);
  set({ draft });
}

export function changeDraft(changes: Partial<CustomerDetails>) {
  setDraftTouched(true);
  set(({ draft }) => ({
    draft: {
      ...draft,
      ...changes,
      id: draft.id,
      sizeId: draft.sizeId
    }
  }));
}

export function resetDraft() {
  set({ draft: initialState.draft });
}

// new customer

export function setNewCustomer(newCustomer: Partial<Customer>) {
  set({ newCustomer });
}

export function changeNewCustomer(changes: Partial<Customer>) {
  set(({ newCustomer }) => ({
    newCustomer: {
      ...newCustomer,
      ...changes,
      id: newCustomer.id
    }
  }));
}

// ------------------------------------------------------------------
// ------------------------ EXTERNAL ACTIONS ------------------------
// ------------------------------------------------------------------

export async function fetchCustomers({ page, size, search }: Pagination) {
  try {
    setCustomersError(null);
    setCustomersLoading(true);
    const { results, total } = await customersService.fetchCustomers(page, size, search);
    setCustomers(results, total);
  } catch (error) {
    if (error instanceof ApiError) {
      setCustomersError(error.message);
    }
  } finally {
    setCustomersLoading(false);
  }
}

export async function fetchCustomerDetails(id: string) {
  try {
    setDraftError(null);
    setDraftLoading(true);
    const details = await customersService.fetchCustomerDetails(id);
    setDraft(details);
  } catch (error) {
    if (error instanceof ApiError) {
      setDraftError(error.message);
    }
  } finally {
    setDraftLoading(false);
  }
}

export async function createCustomer(draft: Omit<Customer, 'id'>) {
  try {
    setNewCustomerError(null);
    setNewCustomerLoading(true);
    const customer = await customersService.createCustomer(draft);
    addCustomer(customer);
    setNewCustomer(customer);
  } catch (error) {
    if (error instanceof ApiError) {
      setNewCustomerError(error.message);
    }
  } finally {
    setNewCustomerLoading(false);
  }
}

export async function updateCustomer(id: string, updates: Partial<Customer>) {
  try {
    setDraftError(null);
    setDraftLoading(true);
    const customer = await customersService.updateCustomer(id, updates);
    replaceCustomer(customer);
    setDraft(customer);
  } catch (error) {
    if (error instanceof ApiError) {
      setDraftError(error.message);
    }
  } finally {
    setDraftLoading(false);
  }
}