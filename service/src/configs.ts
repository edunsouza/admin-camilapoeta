import { Config, Connection } from '@planetscale/database';

export type DbConnection = Connection & {
  execute: <T extends object>(query: string, args?: unknown) => Promise<{
    rows: T[];
    insertId: string;
    statement: string;
  }>
}

declare module 'hono' {
  interface ContextVariableMap {
    dbConnection: DbConnection
  }
}

export type WorkerEnv = {
  WORKER_ENV: string;
  PROD_DB_HOST: string;
  PROD_DB_PASSWORD: string;
  PROD_DB_USER: string;
  CALLMEBOT_API_KEY: string;
  ALERTS_PHONE: string;
};

export const getConfigs = (env: WorkerEnv): Config => ({
  host: env.PROD_DB_HOST,
  username: env.PROD_DB_USER,
  password: env.PROD_DB_PASSWORD,
  // TODO: fix later
  fetch: (url, init) => {
    delete (init!)['cache'];
    return fetch(url, init);
  }
});