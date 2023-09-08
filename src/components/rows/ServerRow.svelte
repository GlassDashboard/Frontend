<script lang="ts">
	import type { ServerDetails } from '$lib/glass/interfaces';

	export let server: ServerDetails;
</script>

<div
	class="server"
	class:offline={server.status == 'OFFLINE'}
	class:setup={server.status == 'SETUP'}
	class:suspended={server.status == 'SUSPENDED'}
	class:online={server.status == 'ONLINE'}
	on:click
>
	<div class="info">
		<h1>{server.name}</h1>
		<p>{server.role}</p>
	</div>

	<div class="right">
		<span>➜</span>
	</div>
</div>

<style lang="scss">
	.server {
		user-select: none;
		display: flex;
		align-items: center;

		width: 100%;
		height: 4rem;

		padding: 0.5rem 1rem;
		box-sizing: border-box;
		background-color: var(--background-color-1);
		transition: filter 0.2s ease-in-out, border-color 0.2s ease-in-out;
		filter: brightness(0.9);

		border-radius: 0.1rem;

		&:hover {
			filter: none;
			cursor: pointer;

			& span {
				visibility: visible;
				margin-right: 1rem;
			}
		}

		&:global(.offline) {
			border-bottom: 2px solid #a22;
			animation: red-border-pulse 2s infinite;
		}

		&:global(.suspended) {
			border-bottom: 2px solid #a17034;
			animation: orange-border-pulse 2s infinite;
		}

		&:global(.setup) {
			border-bottom: 2px solid #a1a134;
			animation: yellow-border-pulse 2s infinite;
		}

		&:global(.online) {
			border-bottom: 2px solid #34a15f;
			animation: green-border-pulse 2s infinite;
		}
	}

	.info {
		display: flex;
		justify-content: center;
		flex-direction: column;

		h1 {
			font-size: 1.3rem;
			margin: 0;
		}

		p {
			font-size: 0.9rem;
			margin: 0;
			color: var(--text-faded-color);
		}
	}

	.right {
		display: flex;
		justify-content: center;
		align-items: center;

		margin-left: auto;

		span {
			font-size: 2rem;
			color: var(--text-color);
			filter: brightness(0.7);
			margin-right: 1.5rem;
			visibility: hidden;

			transition: all 0.1s ease-in-out;
		}
	}

	@keyframes red-border-pulse {
		50% {
			border-color: rgba(#a22, 0.3);
		}
	}

	@keyframes orange-border-pulse {
		50% {
			border-color: rgba(#a17034, 0.3);
		}
	}

	@keyframes yellow-border-pulse {
		50% {
			border-color: rgba(#a1a134, 0.3);
		}
	}

	@keyframes green-border-pulse {
		50% {
			border-color: rgba(#34a15f, 0.3);
		}
	}
</style>
