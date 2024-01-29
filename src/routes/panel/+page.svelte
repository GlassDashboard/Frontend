<script lang="ts">
	import RowHeader from '../../components/rows/RowHeader.svelte';
	import Glass from '$lib/glass';
	import type { ServerDetails, ServerState } from '$lib/glass/interfaces';
	import ServerRow from '../../components/rows/ServerRow.svelte';
	import Skeleton from '../../components/styling/Skeleton.svelte';
	import CreateRow from '../../components/rows/CreateRow.svelte';
	import Error from '../../components/styling/Error.svelte';
	import { onMount } from 'svelte';
	import { socket } from '../../stores/socket';

	let loading = true;
	let reachable = true;
	let servers: ServerDetails[] = [];

	(async () => {
		// Check if the backend is reachable
		reachable = await Glass.ping();
		if (!reachable) return;

		servers = await Glass.user.getAllServers();
		loading = false;
	})();

	const manageServer = (server: ServerDetails) => {
		location.href = `/panel/${server.id}`;
	};

	onMount(() => {
		$socket?.on('server:status', (data) => {
			const { id, status } = data;

			servers = servers.map((s) => {
				if (s.id !== id) return s;
				return {
					...s,
					status
				};
			});
		});
	});
</script>

<main>
	<RowHeader title="Your Servers" />

	{#if !reachable}
		<Error title="Failed to reach Glass" />
	{:else if loading}
		{#each { length: 2 } as _, i}
			<Skeleton height="64px" index={i} />
		{/each}
	{:else}
		{#each servers as server}
			<ServerRow {server} on:click={() => manageServer(server)} />
		{/each}
		<CreateRow />
	{/if}
</main>

<style lang="scss">
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
		gap: 0.4rem;
	}
</style>
