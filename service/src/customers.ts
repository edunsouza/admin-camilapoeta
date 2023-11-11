import { Context } from 'hono';

export const getAll = (c: Context) => {
  return c.json({
    total: 2,
    results: [{ id: '1', name: 'customer 1' }, { id: '2', name: 'customer 2' }]
  });
};

export const create = (c: Context) => {
  return c.json({ route: '/customers' });
};

export const getById = (c: Context) => {
  return c.json({ route: '/customers/:id' });
};

export const updateById = (c: Context) => {
  return c.json({ route: '/customers/:id' });
};
