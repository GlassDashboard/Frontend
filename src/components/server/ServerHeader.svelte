<script lang="ts">
	import { server } from '../../stores/server';
	import ServerTag from './ServerTag.svelte';
	import StatusBadge from './StatusBadge.svelte';
</script>

{#if $server}
	<div class="header">
		<div class="overview">
			<ServerTag server={$server} />
			<StatusBadge server={$server} />
		</div>
	</div>
{/if}

<style>
	.header {
		display: flex;
		justify-content: center;
		flex-direction: column;
		gap: 1rem;
		width: 100%;
		padding: 1rem 0;
		box-sizing: border-box;
	}

	.overview {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}
</style>
