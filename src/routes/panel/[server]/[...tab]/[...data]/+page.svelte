<script lang="ts">
	import { goto } from '$app/navigation';
	import type { User } from '@clerk/clerk-js/dist/types/core/resources/User';
	import ServerConsole from '../../../../../components/console/ServerConsole.svelte';
	import ServerFileManager from '../../../../../components/files/ServerFileManager.svelte';
	import ServerHeader from '../../../../../components/server/ServerHeader.svelte';
	import WorkInProgress from '../../../../../components/styling/WorkInProgress.svelte';
	import Tab from '../../../../../components/tabs/Tab.svelte';
	import Tabs from '../../../../../components/tabs/Tabs.svelte';
	import { clerk } from '../../../../../stores/clerk';
	import { server as serverStore } from '../../../../../stores/server';
	import type { PageData } from './$types';
	import ServerUsers from '../../../../../components/users/ServerUsers.svelte';

	let tabs: Tabs | undefined = undefined;
	$: tab = data.tab == '' ? 'Console' : data.tab;

	export let data: PageData;
	$: server = $serverStore!;
	$: isAdmin = $clerk!.user?.publicMetadata['admin'];

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
			<Tab key="Players"><WorkInProgress /></Tab>
			<Tab key="Analytics"><WorkInProgress /></Tab>
			<Tab key="Plugins"><WorkInProgress /></Tab>
			<Tab key="Users"><ServerUsers {server} /></Tab>
			<Tab key="Integrations"><WorkInProgress /></Tab>
			<Tab key="Settings"><WorkInProgress /></Tab>
			<Tab key="FTP"><WorkInProgress /></Tab>
			{#if isAdmin}
				<Tab key="Admin"><WorkInProgress /></Tab>
			{/if}
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
