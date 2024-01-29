<script lang="ts">
	import Header from '../components/page/Header.svelte';
	import ClerkProvider from '../providers/ClerkProvider.svelte';
	import './styles.css';

	import type { LayoutData } from './$types';
	export let data: LayoutData;

	console.log(data);
</script>

<ClerkProvider />
<div class="app">
	<Header link={data.previous} />
	<slot />
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
</style>
