export class ApiError extends Error {
  status: number = 500;
  body: Record<string, unknown> | null;

  constructor(content: Record<string, unknown>, status: number) {
    super(
      content?.message?.toString()
      || content?.error?.toString()
      || 'Erro desconhecido'
    );
    this.status = status;
    this.body = content ?? null;
  }
}

export type Pagination = {
  page: string;
  size: string;
  search?: string;
};

export type Customer = {
  id: string;
  name: string;
  phone: string;
  email: string;
};

export type CustomerDetails = Customer & {
  sizeId: string;
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