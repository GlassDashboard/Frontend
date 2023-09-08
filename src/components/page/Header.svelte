<script lang="ts">
	import Logo from './Logo.svelte';
	import SignedIn from '../clerk/SignedIn.svelte';
	import UserButton from '../clerk/UserButton.svelte';

	export let link: string = '/';
</script>

<header>
	<Logo text={true} {link} />

	<SignedIn>
		<UserButton />
	</SignedIn>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 2rem;
	}
</style>
