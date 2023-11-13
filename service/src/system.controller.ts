import { Context } from 'hono';
import { sendWhatsappMessage, unknownError } from './helpers';

export const touchSystem = async (c: Context) => {
  console.log('SYSTEM TOUCH REQUESTED');
  const db = c.get('dbConnection');

  try {
    const now = new Date();

    await db.execute(`
      UPDATE system
      SET last_update = ?
      WHERE id = 1;
    `, [now]);

    await sendWhatsappMessage(c, 'Planetscale DB prevented from sleep (camilapoeta-com)');

    return c.json({ touchedAt: now });
  } catch (error) {
    console.log(error);
    return unknownError(c);
  }
};
