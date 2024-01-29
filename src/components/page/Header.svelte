<script lang="ts">
	import Logo from './Logo.svelte';
	import SignedIn from '../clerk/SignedIn.svelte';
	import UserButton from '../clerk/UserButton.svelte';
	import { clerk } from '../../stores/clerk';

	export let link: string = '/';
	$: console.log(`Header link: ${link}`);
</script>

<header>
	<Logo text={true} {link} />

	{#if $clerk}
		<SignedIn clerk={$clerk}>
			<UserButton />
		</SignedIn>
	{/if}
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 2rem;
	}
</style>
