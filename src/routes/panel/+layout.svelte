<script lang="ts">
	import SignIn from '../../components/clerk/SignIn.svelte';
	import SignedIn from '../../components/clerk/SignedIn.svelte';
	import SignedOut from '../../components/clerk/SignedOut.svelte';
	import PageLoader from '../../components/styling/PageLoader.svelte';
	import SocketProvider from '../../providers/SocketProvider.svelte';
	import { clerk } from '../../stores/clerk';
</script>

{#if !$clerk}
	<PageLoader />
{:else}
	<SignedIn clerk={$clerk}>
		<slot />
		<SocketProvider />
	</SignedIn>
	<SignedOut clerk={$clerk}>
		<SignIn />
	</SignedOut>
{/if}
