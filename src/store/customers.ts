import { create } from 'zustand';

interface Customer {
  id: string | null;
  name: string;
}

interface State {
  customers: Customer[],
  setCustomers: (customers: Customer[]) => void;
  removeCustomer: (id: Customer['id']) => void;
  upsertCustomer: (customer: Customer) => void;

  selectedCustomer: Partial<Customer>;
  updateSelectedCustomer: (customer: Partial<Customer>) => void;
}

export const useCustomers = create<State>((set, get) => ({
  customers: [],
  setCustomers: (customers: Customer[]) => set({ customers }),
  removeCustomer: (id: Customer['id']) => set({ customers: get().customers.filter((c) => c.id !== id) }),
  upsertCustomer: (customer: Customer) => set(({ customers: previous }) => ({
    customers: previous.find(({ id }) => id === customer.id)
      ? previous.map((m) => (m.id === customer.id ? customer : m))
      : [...previous, customer]
  })),

  selectedCustomer: {},
  updateSelectedCustomer: (updates: Partial<Customer>) => set({ selectedCustomer: { ...get().selectedCustomer, ...updates } }),
}));
