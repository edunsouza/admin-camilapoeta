export interface Env {
	PROD_DB_HOST: string;
	PROD_DB_PASSWORD: string;
	PROD_DB_USER: string;
}

// testing CI build #3

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		return new Response(JSON.stringify({
			METHOD: request.method,
			'env.PROD_DB_HOST': env.PROD_DB_HOST,
			'env.PROD_DB_PASSWORD': env.PROD_DB_PASSWORD,
			'env.PROD_DB_USER': env.PROD_DB_USER
		}), {
			headers: {
				'Content-Type': 'application/json'
			}
		});
	},
};
