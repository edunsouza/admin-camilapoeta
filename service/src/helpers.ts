import { Context } from 'hono';

export const serverError = (c: Context, error: string) => c.json({ error }, { status: 500 });

export const badRequestError = (c: Context, error: string) => c.json({ error }, { status: 400 });

export const unknownError = (c: Context) => serverError(c, 'Erro desconhecido');
