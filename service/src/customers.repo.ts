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

type CustomerDetails = CustomerDB & Omit<SizeDB, 'customer_id'> & {
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

export const search = async (db: D1Database, search: SearchParams) => {
  const { size, offset, term } = search;

  const params = !term ? [] : [`%${term}%`];
  const where = !term ? '' : `
    WHERE
      name LIKE ?1
      OR phone LIKE ?1
      OR email LIKE ?1
  `;
  const countQuery = `
    SELECT count(id) AS total
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
    db.prepare(countQuery).bind(...params).first<{ total: string }>(),
    db.prepare(searchQuery).bind(...params).all<CustomerDB>()
  ]);

  return {
    total: countResult?.total,
    results: searchResult.results
  }
};

export const create = async (db: D1Database, draft: Omit<CustomerDB, 'id'>) => {
  const { name, email, phone } = draft;

  const insertCustomer = `INSERT INTO customers (name, email, phone) VALUES (?1, ?2, ?3) RETURNING id`;
  const { id: customerId } = await db.prepare(insertCustomer).bind(name, email, phone).first() as { id: string };

  const insertSize = `INSERT INTO sizes (customer_id) VALUES (?1) RETURNING id`;
  const { id: sizeId } = await db.prepare(insertSize).bind(customerId).first() as { id: string };

  return {
    id: customerId,
    sizeId,
    name,
    email,
    phone
  };
};

export const get = async (db: D1Database, id: string) => {
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
    WHERE c.id = ?1
  `;

  const customer = await db.prepare(query).bind(id).first<CustomerDetails>();
  return customer;
};

export const update = async (db: D1Database, updates: Partial<CustomerDetails> & { id: string }) => {
  const [customerSet, customerValues, sizeSet, sizeValues] = [[], [], [], []] as string[][];

  Object.entries(updates).forEach(([key, value]) => {
    if (updatableCustomerFields.includes(key)) {
      customerSet.push(`${key} = ?`);
      customerValues.push(value);
    }
    if (updatableSizeFields.includes(key)) {
      sizeSet.push(`${key} = ?`);
      sizeValues.push(value);
    }
  });

  // changing customer info
  if (customerValues.length) {
    const query = `UPDATE customers SET ${customerSet.join(', ')} WHERE id = ?`;
    await db.prepare(query).bind(...customerValues, updates.id).run();
  }

  // changing customer sizes
  if (sizeValues.length) {
    const query = `UPDATE sizes SET ${sizeSet.join(', ')} WHERE customer_id = ?`;
    await db.prepare(query).bind(...sizeValues, updates.id).run();
  }
};