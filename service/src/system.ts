import { Context } from 'hono';

type SystemInfo = {
  id: number;
  last_update: string;
}

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

    return c.json({ touchedAt: now });
  } catch (error) {
    console.log(error);
  }
};
