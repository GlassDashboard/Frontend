<script lang="ts" context="module">
	export const TABS = Symbol('tabs');

	export type TabManager = {
		current: Writable<number>;
		tabs: Writable<string[]>;
		index: (tab: string) => number;
		set: (tab: string) => void;
		isSelected: (tab: string) => boolean;
		register: (key: string) => void;
	};
</script>

<script lang="ts">
	import { createEventDispatcher, setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import TabHeader from './TabHeader.svelte';

	export let initial: string | null = null;
	let tabs: Writable<string[]> = writable([]);
	let names: Writable<string[]> = writable([]);
	let current = writable(0);

	const dispatcher = createEventDispatcher<{ change: string }>();
	const getIndex = (tab: string) => $tabs.indexOf(tab.toLowerCase());

	export const manager: TabManager = {
		current,
		tabs,
		index: getIndex,
		set: (tab: string) => {
			current.set(getIndex(tab));
			dispatcher('change', tab);
		},
		isSelected: (tab: string) => getIndex(tab) === $current,
		register: (key: string) => {
			$names.push(key);
			names.set($names);
			tabs.set($names.map((name) => name.toLowerCase()));

			if (initial && initial.toLowerCase() === key.toLowerCase())
				current.set(getIndex(key));
		}
	};

	setContext(TABS, manager);
</script>

<div>
	<div class="header">
		{#each $names as tab (getIndex(tab))}
			<TabHeader
				name={tab}
				selected={$current === getIndex(tab)}
				on:click={() => manager.set(tab)}
			/>
		{/each}
	</div>

	<slot />
</div>

<style>
	.header {
		display: flex;
		flex-wrap: wrap;
		margin: 0.5rem 0;
	}
</style>
