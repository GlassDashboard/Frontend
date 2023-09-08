<script lang="ts">
	import { getContext } from 'svelte';
	import { TABS, type TabManager } from './Tabs.svelte';

	export let key: string;
	const manager = getContext(TABS) as TabManager;
	$: current = manager.current;

	manager.register(key);

	$: selected = $current === manager.index(key);
</script>

{#if selected}
	<slot />
{/if}
