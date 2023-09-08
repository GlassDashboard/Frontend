import type { LayoutLoad } from './$types';

export const load = (({ params }) => {
	return {
		server: params.server,
		tab: params.tab
	};
}) satisfies LayoutLoad;
