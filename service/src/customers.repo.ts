import { DbConnection } from './configs';


type CustomerDB = {
  id: string;
  name: string;
  phone: string;
  email: string;
};

type SizeDB = {
  id: string;
  customer_id: string;
  bust: string;
  waist: string;
  hip: string;
  back: string;
  cleavage: string;
  arm: string;
  sleeve: string;
  crotch: string;
  bust_height: string;
  body_length: string;
  skirt_length: string;
  pants_length: string;
};

type CustomerDetails = CustomerDB & Omit<SizeDB, 'customer_id' | 'id'> & {
  size_id: string;
};

type SearchParams = {
  size: number;
  offset: number;
  term?: string;
};

const updatableCustomerFields = ['name', 'phone', 'email'];
const updatableSizeFields = [
  'bust',
  'waist',
  'hip',
  'back',
  'cleavage',
  'arm',
  'sleeve',
  'crotch',
  'bust_height',
  'body_length',
  'skirt_length',
  'pants_length'
];

export const search = async (db: DbConnection, search: SearchParams) => {
  const { size, offset, term } = search;

  const params = { term: `%${term}%` };
  const where = !term ? '' : `
    WHERE
      name LIKE :term
      OR phone LIKE :term
      OR email LIKE :term
  `;
  const countQuery = `
    SELECT
      count(id) AS total
    FROM customers
    ${where}
  `;
  const searchQuery = `
    SELECT id, name, phone, email
    FROM customers
    ${where}
    LIMIT ${size}
    OFFSET ${offset}
  `;

  const [countResult, searchResult] = await Promise.all([
    db.execute<{ total: string }>(countQuery, params),
    db.execute<CustomerDB>(searchQuery, params)
  ]);

  return {
    total: countResult.rows[0]?.total,
    results: searchResult.rows
  }
};

export const create = async (db: DbConnection, draft: Omit<CustomerDB, 'id'>) => {
  const { name, email, phone } = draft;

  const insertCustomer = `INSERT INTO customers (name, email, phone) VALUES (:name, :email, :phone)`;
  const insertSize = `INSERT INTO sizes (customer_id) VALUES (:customerId)`;

  const insertCustomerValues = { name, email, phone };
  const { insertId: customerId } = await db.execute(insertCustomer, insertCustomerValues);

  const insertSizeValues = { customerId };
  const { insertId: sizeId } = await db.execute(insertSize, insertSizeValues);

  return {
    id: customerId,
    sizeId,
    name,
    email,
    phone
  };
};

export const get = async (db: DbConnection, id: string) => {
  const params = { id };
  const query = `
    SELECT
      c.id AS id,
      s.id AS size_id,
      name,
      phone,
      email,
      bust,
      waist,
      hip,
      back,
      cleavage,
      arm,
      sleeve,
      crotch,
      bust_height,
      body_length,
      skirt_length,
      pants_length
    FROM customers c
    JOIN sizes s ON c.id = s.customer_id
    WHERE c.id = :id
  `;

  const { rows } = await db.execute<CustomerDetails>(query, params);
  return rows[0];
};

export const update = async (db: DbConnection, updates: Partial<CustomerDetails> & { id: string }) => {
  const [customerUpdates, sizeUpdates] = [{}, {}] as Record<string, any>[];

  Object.entries(updates).forEach(([key, value]) => {
    if (updatableCustomerFields.includes(key)) {
      customerUpdates[key] = value;
    }
    if (updatableSizeFields.includes(key)) {
      sizeUpdates[key] = value;
    }
  });

  const customerColumns = Object.keys(customerUpdates);
  const sizeColumns = Object.keys(sizeUpdates);
  const toColumnsUpdate = (columns: string[]) => columns.map(c => `${c} = :${c}`);

  // changing customer info
  if (customerColumns.length) {
    const query = `UPDATE customers SET ${toColumnsUpdate(customerColumns).join(', ')} WHERE id = :id`;
    await db.execute(query, { ...customerUpdates, id: updates.id });
  }

  // changing customer sizes
  if (sizeColumns.length) {
    const query = `UPDATE sizes SET ${toColumnsUpdate(sizeColumns).join(', ')} WHERE customer_id = :id`;
    await db.execute(query, { ...sizeUpdates, id: updates.id });
  }
};