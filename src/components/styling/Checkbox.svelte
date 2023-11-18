<script lang="ts">
	import { handleTabCompletion } from '$lib/logic';
	import { createEventDispatcher } from 'svelte';
	import { writable } from 'svelte/store';

	export let state = writable(false);

	const dispatch = createEventDispatcher<{ state: boolean }>();
	$: dispatch('state', $state);

	const click = () => {
		state.update((state) => !state);
	};
</script>

<!--  a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div on:click={click} on:click on:keydown={handleTabCompletion} tabindex="0">
	<div class="checkbox" class:active={$state}>
		{#if $state}
			<svg viewBox="0 0 24 24">
				<path d="M19 5L9 17l-5-5" />
			</svg>
		{/if}
	</div>
</div>

<style lang="scss">
	.checkbox {
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;

		min-width: 1.25rem;
		min-height: 1.25rem;

		border-radius: 0.25rem;
		border: 1px solid var(--text-faded-color);
		background-color: var(--background-color-1);
		transition: all 0.2s ease-in-out;

		&:hover {
			background-color: var(--background-color-2);
		}

		&.active {
			background-color: var(--color);
			border-color: var(--color);
		}

		svg {
			width: 1rem;
			height: 1rem;
			fill: none;
			stroke: var(--text-color);
			stroke-width: 4px;
		}
	}
</style>
