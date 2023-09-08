<script lang="ts">
	import { getContext } from 'svelte';
	import { FILE_MANAGER, type FileManager } from './ServerFileManager.svelte';

	export let path: string;
	const manager: FileManager = getContext(FILE_MANAGER);

	$: folders = ('/container' + (path == '/' ? '' : path)).split('/').slice(1);
	$: current = folders.pop();

	const back = (index: number) => {
		manager.back(folders.length - index);
	};
</script>

{#each folders as folder, index}
	<div on:click={() => back(index)}>{folder}</div>
	<span>/</span>
{/each}

{#if current}
	<span class="current">{current}</span>
{/if}

{#if folders.length == 0}
	<span>/</span>
{/if}

<style lang="scss">
	div {
		text-decoration: none;
		border: none;
		cursor: pointer;
		margin: none;
		user-select: none;

		padding: 0 0.25rem;

		&:hover {
			color: var(--text-color);
			padding: 0 0.25rem;
			text-decoration: underline;
		}
	}

	span:not(.current) {
		color: var(--text-faded-color);
		padding: 0 0.25rem;
		user-select: none;
	}

	.current {
		color: var(--text-faded-color);
		user-select: none;
		padding: 0 0.25rem;
	}
</style>
