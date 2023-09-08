<script lang="ts">
	import RowHeader from '../../components/rows/RowHeader.svelte';
	import Glass from '$lib/glass';
	import type { ServerDetails } from '$lib/glass/interfaces';
	import ServerRow from '../../components/rows/ServerRow.svelte';
	import Skeleton from '../../components/styling/Skeleton.svelte';
	import CreateRow from '../../components/rows/CreateRow.svelte';

	let loading = true;
	let servers: ServerDetails[] = [];

	(async () => {
		servers = await Glass.user.getAllServers();
		loading = false;
	})();

	const manageServer = (server: ServerDetails) => {
		location.href = `/panel/${server.id}`;
	};
</script>

<main>
	<RowHeader title="Your Servers" />

	{#if loading}
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

<style>
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
