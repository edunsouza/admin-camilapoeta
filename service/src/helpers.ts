import { Context } from 'hono';
import { WorkerEnv } from './configs';

export const serverError = (c: Context, error: string) => c.json({ error }, { status: 500 });

export const badRequestError = (c: Context, error: string) => c.json({ error }, { status: 400 });

export const unknownError = (c: Context) => serverError(c, 'Erro desconhecido');

export const sendWhatsappMessage = (c: Context, message: string) => {
  const { CALLMEBOT_API_KEY, ALERTS_PHONE } = c.env as WorkerEnv;
  const apiUrl = new URL('https://api.callmebot.com/whatsapp.php');
  apiUrl.searchParams.append('apikey', CALLMEBOT_API_KEY);
  apiUrl.searchParams.append('phone', ALERTS_PHONE);
  apiUrl.searchParams.append('text', message);

  return fetch(apiUrl.toJSON());
};