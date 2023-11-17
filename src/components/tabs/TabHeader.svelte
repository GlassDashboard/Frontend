<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let name: string;
	export let selected: boolean;

	const dispatcher = createEventDispatcher<{ click: string }>();

	const handleClick = (e: KeyboardEvent) => {
		if (e.key !== 'Enter') return;
		dispatcher('click', name);
	};
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div tabindex="0" class:selected on:click on:keydown={handleClick}>
	{name}
</div>

<style lang="scss">
	div {
		padding: 0.5rem 1.5rem;
		border-bottom: 2px solid var(--background-color-2);
		transition: border-color 0.2s ease-in-out;
		user-select: none;
		cursor: pointer;

		&.selected {
			border-bottom: 2px solid var(--color);
		}
	}
</style>
