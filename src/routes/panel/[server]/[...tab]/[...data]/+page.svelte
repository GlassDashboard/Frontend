<script lang="ts">
	import { goto } from '$app/navigation';
	import ServerConsole from '../../../../../components/console/ServerConsole.svelte';
	import ServerFileManager from '../../../../../components/files/ServerFileManager.svelte';
	import ServerHeader from '../../../../../components/server/ServerHeader.svelte';
	import Tab from '../../../../../components/tabs/Tab.svelte';
	import Tabs from '../../../../../components/tabs/Tabs.svelte';
	import { server as serverStore } from '../../../../../stores/server';
	import type { PageData } from './$types';

	let tabs: Tabs | undefined = undefined;
	$: tab = data.tab == '' ? 'Console' : data.tab;

	export let data: PageData;
	$: server = $serverStore!;

	const tabChange = (event: CustomEvent<string>) => {
		const key = event.detail == 'Console' ? '' : event.detail.toLowerCase();

		const url = data.current
			?.replace('[...tab]', key)
			.replace('[...data]', '')
			.replace('[server]', server.id);

		// if (url)
		// 	goto(url, {
		// 		replaceState: false
		// 	});
	};
</script>

<main class="big">
	<ServerHeader />
	<div>
		<Tabs initial={tab} on:change={tabChange} bind:this={tabs}>
			<Tab key="Console"><ServerConsole {server} /></Tab>
			<Tab key="Files"><ServerFileManager {server} {data} /></Tab>
			<Tab key="Players">Hello World 2</Tab>
			<Tab key="Analytics">Hello World 2</Tab>
			<Tab key="Plugins">Hello World 2</Tab>
			<Tab key="Users">Hello World 2</Tab>
			<Tab key="Integrations">Hello World 2</Tab>
			<Tab key="Settings">Hello World 2</Tab>
			<Tab key="FTP">Hello World 2</Tab>
			<Tab key="Admin">Hello World 2</Tab>
		</Tabs>
	</div>
</main>

<style>
	div {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}
</style>
