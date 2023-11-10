export type RouteParams = {
  CustomerDetails: { id: string };
}

export const routes = {
  customers: '/clientes',
  addCustomer: '/novo-cliente',
  customerDetails: '/clientes/:id',
};

export const parseRoute = (key: keyof typeof routes, ...params: string[]) => {
  return {
    customers: routes.customers,
    addCustomer: routes.addCustomer,
    customerDetails: routes.customerDetails.replace(':id', params?.[0] ?? ''),
  }[key];
};

export const menuItems: { name: string; route: string; }[] = [
  {
    name: 'Clientes',
    route: routes.customers,
  },
  {
    name: 'Adicionar Cliente',
    route: routes.addCustomer,
  },
];