<script lang="ts" context="module">
	export const PERMISSIONS = Symbol('permission_group');

	export type PermissionManager = {
		getCalculatedPermissions: () => bigint;
		add: (permission: bigint) => void;
		remove: (permission: bigint) => void;
	};
</script>

<script lang="ts">
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	export let header: string;
	export let danger: boolean = false;

	const allPermissions = writable<bigint>(0n);
	export const manager: PermissionManager = {
		getCalculatedPermissions: () => $allPermissions,
		add: (permission) => {
			allPermissions.update((p) => p | permission);
		},
		remove: (permission) => {
			allPermissions.update((p) => p & ~permission);
		}
	};

	setContext(PERMISSIONS, manager);
</script>

<div>
	<h3>{header}</h3>

	{#if danger}
		<div class="danger">
			<i class="gg-danger" />
			<span>
				These permissions are dangerous to give out and could give users access
				to full access to Glass
			</span>
		</div>
	{/if}

	<slot />
</div>

<style lang="scss">
	div {
		background-color: var(--background-color-1);
		padding: 0.5rem 1rem;
		margin-top: 0.5rem;
		border-radius: 0.5rem;

		h3 {
			margin: 0;
			margin-bottom: 0.5rem;
			font-weight: 400;
		}
	}

	.danger {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
		border-radius: 0;
		padding: 0.5rem;
		border-left: 0.25rem solid #a22;
		color: rgb(231, 136, 136);
		user-select: none;

		span {
			font-size: 0.9rem;
		}

		i {
			font-size: 1.5rem;
		}
	}
</style>
