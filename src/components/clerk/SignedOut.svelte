<script lang="ts">
	import { Logger } from '$lib/logger';
	import type Clerk from '@clerk/clerk-js';
	import PageLoader from '../styling/PageLoader.svelte';
	export let clerk: Clerk;
</script>

{#if clerk.user === null}
	<slot />
{/if}
