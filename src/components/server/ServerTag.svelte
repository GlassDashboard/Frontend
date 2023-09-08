<script lang="ts">
	import type { ServerDetails } from './../../lib/glass/interfaces';
	export let server: ServerDetails;
</script>

<div class="info">
	<img
		alt="Server Icon"
		src={`/images/server/${server?.serverType.toLowerCase()}.png`}
		width="38"
		height="38"
		decoding="async"
		loading="lazy"
	/>
	<div>{server?.name}</div>
</div>

<style>
	img {
		user-select: none;
	}

	.info {
		display: flex;
		align-items: center;
		gap: 0.5rem;

		font-size: 2rem;
		font-family: Mulish, sans-serif;
	}
</style>
