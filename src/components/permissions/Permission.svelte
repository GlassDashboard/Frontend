<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import {
		PERMISSIONS,
		type PermissionManager
	} from './PermissionGroup.svelte';
	import Checkbox from '../styling/Checkbox.svelte';

	export let current: bigint;
	export let permission: bigint;
	let checkbox: Checkbox;

	const group = getContext(PERMISSIONS) as PermissionManager;

	onMount(() => {
		if (current & permission) checkbox.state?.set(true);
	});

	const updateState = (event: CustomEvent<boolean>) => {
		if (event.detail) group.add(permission);
		else group.remove(permission);
	};

	const updateCheckbox = () => {
		checkbox.state?.update((c) => !c);
	};
</script>

<div on:click={updateCheckbox}>
	<Checkbox bind:this={checkbox} on:state={updateState} />
	<p><slot /></p>
</div>

<style lang="scss">
	div {
		display: flex;
		gap: 1rem;
		align-items: center;
	}

	p {
		user-select: none;
		margin: 0;
		padding: 0.5rem 0;
	}
</style>
