import { WorkerContext } from './configs';
import { badRequestError, serverError, unknownError } from './helpers';
import * as customersRepo from './customers.repo';

type Customer = {
  id: string;
  name: string;
  phone: string;
  email: string;
};

export const getAll = async (c: WorkerContext) => {
  const page = Number(c.req.query('page')) || 1;
  const size = Number(c.req.query('size')) || 50;
  const offset = (page - 1) * size;
  const search = c.req.query('search') || null;
  const term = search?.toString().toLowerCase();

  try {
    const { DB } = c.env;
    const { total, results } = await customersRepo.search(DB, { size, offset, term });

    return c.json({
      total,
      results
    });
  } catch (error) {
    console.log(error);
    return unknownError(c);
  }
};

export const create = async (c: WorkerContext) => {
  const { name, email, phone } = await c.req.json() as Customer;

  if (!name || (!email && !phone)) {
    return badRequestError(c, 'Nome e email/telefone são obrigatórios');
  }

  try {
    const { DB } = c.env;
    const customer = await customersRepo.create(DB, { name, email, phone });

    return c.json(customer);
  } catch (error) {
    console.log(error);
    return unknownError(c);
  }
};

export const getById = async (c: WorkerContext) => {
  const { id } = c.req.param();

  if (!id) {
    return badRequestError(c, 'Cliente inválido');
  }

  try {
    const { DB } = c.env;
    const customer = await customersRepo.get(DB, id);

    if (!customer) {
      return serverError(c, 'Cliente não encontrado');
    }

    return c.json(customer);
  } catch (error) {
    console.log(error);
    return unknownError(c);
  }
};

export const updateById = async (c: WorkerContext) => {
  const { id } = c.req.param();
  const body = await c.req.json();

  if (!id) {
    return badRequestError(c, 'Cliente inválido');
  }

  try {
    const { DB } = c.env;
    await customersRepo.update(DB, { ...body, id });
    const customer = await customersRepo.get(DB, id);

    return c.json(customer);
  } catch (error) {
    console.log(error);
    return unknownError(c);
  }
};
