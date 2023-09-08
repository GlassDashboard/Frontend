<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { clerk } from '../../stores/clerk';

	let signInElement;
	let unsubscribe = () => {};

	onMount(() => {
		unsubscribe = clerk.subscribe((clerk) => {
			if (clerk) {
				clerk.mountSignIn(signInElement);
			}
		});
	});

	onDestroy(unsubscribe);
</script>

<div id="clerk" bind:this={signInElement} />

<style>
	:global(#clerk) {
		align-self: center;
	}
</style>
