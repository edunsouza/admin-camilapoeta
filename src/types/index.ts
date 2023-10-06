export class ApiError extends Error {
  status: number = 500;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export interface Pagination {
  page: string;
  size: string;
  search?: string;
}

export interface Customer {
  id: string | null;
  name: string;
  phone: string;
  email: string;
}

export type Sizing = {
  id: string;
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
