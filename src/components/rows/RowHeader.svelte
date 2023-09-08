<script lang="ts">
	import type Button from '../../interfaces/button';

	export let title: string;
	export let button: Button | null = null;
</script>

<div class="root">
	<div class="spread inline">
		<h1>{title}</h1>

		{#if button}
			<button
				on:click|preventDefault={button.onClick}
				class="short btn {button.color}"
			>
				{button.text}
			</button>
		{/if}
	</div>

	<hr />
</div>

<style>
	h1 {
		font-size: 1rem;
		margin: 0;
	}

	.root {
		width: 100%;
	}
</style>
