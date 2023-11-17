<script lang="ts">
	import Glass from '$lib/glass';
	import PageLoader from '../../../../../components/styling/PageLoader.svelte';
	import SocketProvider from '../../../../../providers/SocketProvider.svelte';
	import { server } from '../../../../../stores/server';

	import type { LayoutData } from '../../$types';
	import { Logger } from '$lib/logger';
	export let data: LayoutData;

	const logger = new Logger('server');

	$: if (!$server || $server.id !== data.server) {
		Glass.server(data.server)
			.get()
			.then((s) => {
				if (s == null)
					return logger.errorThenRetry(
						`Failed to load server data for ${data.server}`
					);

				logger.info(`Loaded server data for ${s.name}`);
				server.set(s);
			});
	}
</script>

{#if !$server}
	<PageLoader />
{:else}
	<slot />
{/if}
<SocketProvider />
