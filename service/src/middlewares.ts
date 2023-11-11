import { Context, Next } from 'hono';
import { connect } from '@planetscale/database';
import { getConfigs } from './configs';

export const authChecker = (ctx: Context, next: Next) => {
  if (ctx.req.path.startsWith('/keep-alive')) {
    return next();
  }

  console.log('... Auth Checker Middleware ...');
  return next();
};

export const dbConnector = (ctx: Context, next: Next) => {
  const config = getConfigs(ctx.env);
  const conn = connect(config);
  ctx.set('dbConnection', conn);
  return next();
};