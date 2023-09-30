export { Router } from './Router';

type MenuItem = {
  group: string;
  name: string;
  route: string;
  isActive: () => boolean;
};

export const routes = {
  customers: '/clientes',
  addCustomer: '/clientes/novo',
  customerDetails: '/clientes/:id',
  sizing: '/medidas/:id',
};

export const menuItems: MenuItem[] = [
  {
    group: 'customers',
    name: 'Clientes',
    route: routes.customers,
    isActive: () => false // TODO
  },
  {
    group: 'add-customer',
    name: 'Adicionar Cliente',
    route: routes.addCustomer,
    isActive: () => false // TODO
  },
];