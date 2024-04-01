import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { WorkerEnv } from './configs';
import { authChecker } from './middlewares';
import * as customersService from './customers.controller';

const isDev = (env: WorkerEnv) => env.WORKER_ENV === 'dev';

const getAllowedOrigin = (env: WorkerEnv) => {
	return isDev(env) ? '*' : ['https://admin.camilapoeta.com'];
};

// triggering gh action - attempt #2

export default {
	async fetch(request: Request, env: WorkerEnv, ctx: ExecutionContext) {
		const app = new Hono<{ Bindings: WorkerEnv }>();

		// MIDDLEWARES
		app.use('*', cors({ origin: getAllowedOrigin(env) }));
		app.use('*', authChecker);

		// CUSTOMERS
		app.get('/customers', customersService.getAll);
		app.post('/customers', customersService.create);
		app.get('/customers/:id', customersService.getById);
		app.patch('/customers/:id', customersService.updateById);

		// FALLBACK
		app.get('*', customersService.getAll);

		return app.fetch(request, env, ctx);
	}
};