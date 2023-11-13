import { Context } from 'hono';
import { badRequestError, serverError, unknownError } from './helpers';
import * as customersRepo from './customers.repo';

type Customer = {
  id: string;
  name: string;
  phone: string;
  email: string;
};

type Size = {
  sizeId: string;
  customerId: string;
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
};

export const getAll = async (c: Context) => {
  const page = Number(c.req.query('page')) || 1;
  const size = Number(c.req.query('size')) || 50;
  const offset = (page - 1) * size;
  const search = c.req.query('search') || null;
  const term = search?.toString().toLowerCase();

  try {
    const db = c.get('dbConnection');
    const { total, results } = await customersRepo.search(db, { size, offset, term });

    return c.json({
      total,
      results
    });
  } catch (error) {
    console.log(error);
    return unknownError(c);
  }
};

export const create = async (c: Context) => {
  const { name, email, phone } = await c.req.json() as Customer;

  if (!name || (!email && !phone)) {
    return badRequestError(c, 'Nome e email/telefone são obrigatórios');
  }

  try {
    const db = c.get('dbConnection');
    const customer = await customersRepo.create(db, { name, email, phone });

    return c.json(customer);
  } catch (error) {
    console.log(error);
    return unknownError(c);
  }
};

export const getById = async (c: Context) => {
  const { id } = c.req.param();

  if (!id) {
    return badRequestError(c, 'Cliente inexistente');
  }

  try {
    const db = c.get('dbConnection');
    const customer = await customersRepo.get(db, id);

    if (!customer) {
      return serverError(c, 'Cliente não encontrado');
    }

    return c.json(customer);
  } catch (error) {
    console.log(error);
    return unknownError(c);
  }
};

export const updateById = async (c: Context) => {
  const { id } = c.req.param();
  const body = await c.req.json();

  if (!id) {
    return badRequestError(c, 'Cliente inexistente');
  }

  try {
    const db = c.get('dbConnection');
    await customersRepo.update(db, { ...body, id });
    const customer = await customersRepo.get(db, id);

    return c.json(customer);
  } catch (error) {
    console.log(error);
    return unknownError(c);
  }
};
