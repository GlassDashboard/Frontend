<script lang="ts">
	export let name: string;
	export let selected: boolean;
</script>

<div class:selected on:click>
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
