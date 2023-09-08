import type { LayoutLoad } from './$types';

export const load = ((data) => {
	const previous = data.url.pathname?.split('/').slice(0, -1).join('/') || '/';

	return {
		previous,
		url: data.url,
		current: data.route.id
	};
}) satisfies LayoutLoad;
