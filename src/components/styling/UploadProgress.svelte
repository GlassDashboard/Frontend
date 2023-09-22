<script lang="ts">
	import type { Writable } from 'svelte/store';

	export let progress: Writable<number>;
</script>

<div style="--value: {$progress}" />

<style>
	@keyframes progress {
		0% {
			--percentage: 0;
		}
		100% {
			--percentage: var(--value);
		}
	}

	div {
		animation: progress 2s 0.5s forwards;
		width: 24px;
		aspect-ratio: 1;
		border-radius: 50%;
		position: relative;
		overflow: hidden;
		display: grid;
		place-items: center;
	}

	div::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: conic-gradient(var(--color) calc(var(--value) * 1%), #cdf 0);
		mask: radial-gradient(white 40%, transparent 0);
		mask-mode: alpha;
		-webkit-mask: radial-gradient(#0000 40%, #000 0);
		-webkit-mask-mode: alpha;
	}
</style>
