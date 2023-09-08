<script lang="ts">
	export let text = false;
	export let link: string | null = null;

	const redirect = () => {
		if (link) window.location.href = link;
	};
</script>

<figure on:click={redirect} class:clickable={link}>
	<img src="/glass.png" alt="Glass Logo" />
	{#if text}
		<figcaption>Glass</figcaption>
	{/if}
</figure>

<style>
	figure {
		user-select: none;
		display: flex;
		gap: 0.5rem;
		align-items: center;
		margin: 0;
	}

	figcaption {
		font-size: 1.4rem;
	}

	img {
		width: 2em;
		height: 2em;
	}

	.clickable {
		cursor: pointer;
	}
</style>
