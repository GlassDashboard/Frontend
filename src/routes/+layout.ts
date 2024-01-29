import type { LayoutLoad } from './$types';

const isVariable = (str: string | undefined) =>
	str === undefined || (str.startsWith('[') && str.endsWith(']'));

export const load = ((data) => {
	const sections = data.route.id?.split('/') ?? [];

	let previous = '/';
	if (sections.length > 0) {
		let isFirst = true;

		while (true) {
			if (isFirst || isVariable(sections[sections.length - 1])) sections.pop();
			else break;
			isFirst = false;
		}

		previous = sections.join('/');
		if (previous.trim() === '') previous = '/';
	}

	return {
		previous,
		url: data.url,
		current: data.route.id
	};
}) satisfies LayoutLoad;
