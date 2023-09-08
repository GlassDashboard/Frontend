<script lang="ts">
	import Glass from '$lib/glass';
	import PageLoader from '../../../../../components/styling/PageLoader.svelte';
	import SocketProvider from '../../../../../providers/SocketProvider.svelte';
	import { server } from '../../../../../stores/server';

	import type { LayoutData } from '../../$types';
	export let data: LayoutData;

	$: Glass.server(data.server)
		.get()
		.then((s) => {
			server.set(s);
		});
</script>

{#if !$server}
	<PageLoader />
{:else}
	<slot />
{/if}
<SocketProvider />
