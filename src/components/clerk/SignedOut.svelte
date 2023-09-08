<script>
	// @ts-nocheck

	import { clerk } from '../../stores/clerk';
	import PageLoader from '../styling/PageLoader.svelte';
</script>

{#if !$clerk}
	<PageLoader />
{:else if $clerk.user === null}
	<slot />
{/if}
