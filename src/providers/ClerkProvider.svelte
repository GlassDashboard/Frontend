<script lang="ts">
	import { onMount } from 'svelte';
	import { clerk as store } from '../stores/clerk.js';
	import Clerk from '@clerk/clerk-js';
	import { PUBLIC_CLERK_PUB_KEY } from '$env/static/public';

	export let clerkPubKey = PUBLIC_CLERK_PUB_KEY;

	onMount(() => {
		const clerk = new Clerk(clerkPubKey);
		clerk.load({}).then(() => {
			store.update(() => clerk);
		});
	});
</script>
