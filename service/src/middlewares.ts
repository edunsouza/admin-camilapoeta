import { Context, Next } from 'hono';

export const authChecker = (ctx: Context, next: Next) => {
  // TODO: validate JWT
  console.log('... Auth Checker Middleware ...');
  return next();
};
