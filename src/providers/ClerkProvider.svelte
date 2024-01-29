<script lang="ts">
	import { onMount } from 'svelte';
	import { clerk as store } from '../stores/clerk.js';
	import Clerk from '@clerk/clerk-js';
	import { PUBLIC_CLERK_PUB_KEY } from '$env/static/public';
	import { Logger } from '$lib/logger';

	export let clerkPubKey = PUBLIC_CLERK_PUB_KEY;
	const logger = new Logger('clerk');

	onMount(() => {
		logger.info('Connecting to Clerk');
		const clerk = new Clerk(clerkPubKey);
		clerk.load({}).then(() => {
			logger.info('Connected into Clerk');
			store.set(clerk);
		});
	});
</script>
