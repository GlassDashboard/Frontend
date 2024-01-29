import { Logger } from '$lib/logger';
import type { LayoutLoad } from './$types';

export const load = (({ params }) => {
	const logger = new Logger('dashboard-router');
	logger.info('Resolved parameters:', params);

	return {
		server: params.server,
		tab: params.tab,
		extra: params.data
	};
}) satisfies LayoutLoad;

export const ssr = false;
