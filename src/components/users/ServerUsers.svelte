<script lang="ts">
	import Glass from '$lib/glass';
	import type { Server, Subuser } from '$lib/glass/interfaces';
	import { onMount } from 'svelte';
	import User from './User.svelte';
	import Skeleton from '../styling/Skeleton.svelte';
	import { Logger } from '$lib/logger';

	const logger = new Logger('users');
	export let server: Server;
	let users: Subuser[] | null = null;

	onMount(() => {
		Glass.server(server.id)
			.users.getAll()
			.then((u) => {
				if (u == null) return logger.errorThenRetry('Failed to fetch users');

				users = [
					...u,
					{
						avatar:
							'https://archive.org/download/discordprofilepictures/discordblue.png',
						id: '1',
						owner: false,
						permissions: 'bi:5',
						username: 'john_doe'
					}
				];
			});
	});
</script>

<div class="users">
	{#if users === null}
		{#each Array(2) as index}
			<Skeleton height="64px" {index} />
		{/each}
	{:else}
		{#each users as user (user.id)}
			<User {user} />
		{/each}
	{/if}
</div>

<style lang="scss">
	.users {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
</style>
