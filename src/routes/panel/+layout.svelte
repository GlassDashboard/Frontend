<script>
	import SignIn from '../../components/clerk/SignIn.svelte';
	import SignedIn from '../../components/clerk/SignedIn.svelte';
	import SignedOut from '../../components/clerk/SignedOut.svelte';
</script>

<SignedIn>
	<slot />
</SignedIn>
<SignedOut>
	<SignIn />
</SignedOut>
