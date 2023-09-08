<script lang="ts">
	export let width = '100%';
	export let height = '1rem';

	export let index = 0;
</script>

<div
	class="skeleton"
	style={`width: ${width}; height: ${height}; animation-delay: ${
		index * 0.4
	}s;`}
>
	<slot class="child" />
</div>

<style>
	/* Make everything inside the div gray */
	.skeleton {
		user-select: none;
		color: #aaa;
		background: linear-gradient(-90deg, #afaeae 0%, #d1d1d1 50%, #afaeae 100%);
		background-size: 400% 400%;
		border: none;
		opacity: 0.5;
		animation: pulse 1.2s ease-in-out infinite;
	}

	@keyframes pulse {
		0% {
			background-position: 0% 0%;
		}
		100% {
			background-position: -135% 0%;
		}
	}
</style>
