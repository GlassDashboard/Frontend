<script lang="ts" context="module">
	export const TABS = Symbol('tabs');
	export const URL = Symbol('url');

	export type TabManager = {
		current: Writable<number>;
		tabs: Writable<string[]>;
		index: (tab: string) => number;
		set: (tab: string) => void;
		exists: (tab: string) => boolean;
		isSelected: (tab: string) => boolean;
		register: (key: string) => void;
		loadFromTab: () => void;
	};

	// Handles automatic routing
	export type URLHandler = {
		getCurrentTab: () => string; // /panel/:server/files/:path -> files, /panel/:server -> console
		updateTab: (tab: string) => void; // /panel/:server/users -> /panel/:server/files
	};
</script>

<script lang="ts">
	import { createEventDispatcher, setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import TabHeader from './TabHeader.svelte';
	import type { PageData } from '../../routes/panel/[server]/[...tab]/[...data]/$types';
	import { goto } from '$app/navigation';

	export let initial: string | null = null;
	export let data: PageData;

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
			urlHandler.updateTab(tab);
		},
		exists: (tab: string) => getIndex(tab) !== -1,
		isSelected: (tab: string) => getIndex(tab) === $current,
		register: (key: string) => {
			$names.push(key);
			names.set($names);
			tabs.set($names.filter((n) => !!n).map((name) => name.toLowerCase()));

			if (initial && initial.toLowerCase() === key.toLowerCase())
				current.set(getIndex(key));
		},
		loadFromTab: () => {
			const tab = urlHandler.getCurrentTab();
			if (!tab || !manager.exists(tab)) return;

			manager.set(tab);
		}
	};

	export const urlHandler: URLHandler = {
		getCurrentTab: () => {
			const current = data.tab;
			if (!current) return $tabs[0];
			else return current;
		},
		updateTab: (tab: string, showFirst: boolean = false) => {
			if (!manager.exists(tab)) return;
			const url = data.current
				?.replace('[...data]', '')
				?.replace(
					'[...tab]',
					manager.index(tab) == 0 && !showFirst ? '' : tab.toLowerCase()
				)
				?.replace('[server]', data.server);

			if (!url) return;
			goto(url, {
				replaceState: false
			});
		}
	};

	setContext(TABS, manager);
	setContext(URL, urlHandler);
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
