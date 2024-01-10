<script lang="ts">
	import Glass from '$lib/glass';
	import type { Server, Subuser } from '$lib/glass/interfaces';
	import { onMount } from 'svelte';
	import User from './User.svelte';
	import Skeleton from '../styling/Skeleton.svelte';
	import { Logger } from '$lib/logger';
	import PermissionGroup from '../permissions/PermissionGroup.svelte';
	import Permission from '../permissions/Permission.svelte';
	import { writable, type Writable } from 'svelte/store';

	const logger = new Logger('users');
	export let server: Server;

	let users: Subuser[] | null = null;
	let editing: Writable<Subuser | null> = writable(null);

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
						permissions:
							2n ** 0n + 2n ** 1n + 2n ** 2n + 2n ** 3n + 2n ** 4n + 2n ** 5n,
						username: 'john_doe'
					}
				];
			});
	});

	const editUser = (event: CustomEvent<Subuser>) => {
		editing.set(event.detail);
	};

	const stopEditing = () => {
		editing.set(null);
	};

	const saveEdit = () => {
		editing.set(null);
	};
</script>

{#if $editing == null}
	<div class="users">
		{#if users === null}
			{#each Array(2) as index}
				<Skeleton height="64px" {index} />
			{/each}
		{:else}
			{#each users as user (user.id)}
				<User {user} on:modify={editUser} />
			{/each}
		{/if}
	</div>
{:else}
	<!-- 
	VIEW_CONSOLE: 2n ** 0n, X
	USE_CONSOLE: 2n ** 1n, X
	CONTROL_SERVER: 2n ** 2n,
	READ_FILES: 2n ** 3n, X
	WRITE_FILES: 2n ** 4n, X
	MANAGE_PLAYERS: 2n ** 5n, X
	VIEW_PERFORMANCE: 2n ** 6n, X
	VIEW_PLUGINS: 2n ** 7n, X
	MANAGE_PLUGINS: 2n ** 8n, X
	FTP_ACCESS: 2n ** 9n, X
	MANAGE_SUBUSERS: 2n ** 10n,
	MANAGE_INTEGRATIONS: 2n ** 11n,
	MANAGE_SERVER: 2n ** 12n 
-->
	<User user={$editing} controls={false} />
	<PermissionGroup header="Server Controls">
		<Permission current={$editing.permissions} permission={2n ** 0n}>
			View Console
		</Permission>
		<Permission current={$editing.permissions} permission={2n ** 1n}>
			Use Console
		</Permission>
		<Permission current={$editing.permissions} permission={2n ** 6n}>
			View Performance
		</Permission>
	</PermissionGroup>
	<PermissionGroup header="File Manager">
		<Permission current={$editing.permissions} permission={2n ** 3n}>
			Read Files
		</Permission>
		<Permission current={$editing.permissions} permission={2n ** 4n}>
			Write Files
		</Permission>
		<Permission current={$editing.permissions} permission={2n ** 9n}>
			FTP Access
		</Permission>
	</PermissionGroup>
	<PermissionGroup header="Server Modifications">
		<Permission current={$editing.permissions} permission={2n ** 5n}>
			Manage Players
		</Permission>
		<Permission current={$editing.permissions} permission={2n ** 7n}>
			View Plugins
		</Permission>
		<Permission current={$editing.permissions} permission={2n ** 8n}>
			Manage Plugins
		</Permission>
	</PermissionGroup>
	<PermissionGroup header="Management" danger>
		<Permission current={$editing.permissions} permission={2n ** 10n}>
			Manage Subusers
		</Permission>
		<Permission current={$editing.permissions} permission={2n ** 11n}>
			Manage Integrations
		</Permission>
		<Permission current={$editing.permissions} permission={2n ** 12n}>
			Manage Server
		</Permission>
	</PermissionGroup>

	<div class="actions">
		<button class="cancel red" on:click={stopEditing}>Cancel</button>
		<button class="save" on:click={saveEdit}>Save Changes</button>
	</div>
	<div class="space" />
{/if}

<style lang="scss">
	.users {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.space {
		height: 5rem;
	}

	.actions {
		display: flex;
		justify-content: flex-end;
		gap: 0.5rem;
		margin-top: 1rem;

		button {
			color: var(--text-color);
		}
	}
</style>
