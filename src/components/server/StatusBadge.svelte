<script lang="ts">
	import type { ServerDetails } from './../../lib/glass/interfaces';

	export let server: ServerDetails;
	$: formattedStatus = server?.status?.toLowerCase();
</script>

<div
	class:online={formattedStatus === 'online'}
	class:offline={formattedStatus === 'offline'}
	class:starting={formattedStatus === 'starting'}
	class:suspended={formattedStatus === 'suspended'}
>
	<svg
		stroke="currentColor"
		fill="currentColor"
		stroke-width="0"
		viewBox="0 0 16 16"
		height="1em"
		width="1em"
		xmlns="http://www.w3.org/2000/svg"
	>
		<circle cx="8" cy="8" r="8" />
	</svg>

	<div class="text">{formattedStatus}</div>
</div>

<style lang="scss">
	div:not(:first-of-type) {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.9em;
		padding: 0.5em 0.8em;
		background-color: var(--badge-color-faded);
		border-radius: 1rem;
		user-select: none;

		svg {
			color: var(--badge-color);
			border-radius: 50%;
			box-shadow: 0px 0px 1px 1px #0000001a;
			filter: brightness(1);
		}
	}

	.text {
		text-transform: capitalize;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
			Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
	}

	.online {
		--badge-color-faded: var(--green-faded);
		--badge-color: var(--green);

		& > svg {
			animation: pulse 2s ease-out infinite;
		}
	}

	.offline {
		--badge-color-faded: var(--red-faded);
		--badge-color: var(--red);
	}

	.starting {
		--badge-color-faded: var(--yellow-faded);
		--badge-color: var(--yellow);
	}

	.suspended {
		--badge-color-faded: var(--orange-faded);
		--badge-color: var(--orange);
	}

	@keyframes pulse {
		0% {
			box-shadow: 0 0 0 0px rgba(0, 0, 0, 0.2);
		}
		100% {
			box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
		}
	}
</style>
