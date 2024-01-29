<script lang="ts">
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

	export let data: PageData;

	let tabs: Tabs | undefined = undefined;
	$: tab = data.tab == '' ? 'Console' : data.tab;

	$: server = $serverStore!;
	$: isAdmin = $clerk!.user?.publicMetadata['admin'] ?? false;
</script>

<main class="big">
	<ServerHeader />
	<div>
		<Tabs initial={tab} bind:this={tabs} {data}>
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
