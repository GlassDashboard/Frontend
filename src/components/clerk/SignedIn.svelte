<script>
	import { clerk } from '../../stores/clerk';
</script>

{#if !$clerk || $clerk.user === undefined}
	<slot name="loading" />
{:else if $clerk.user !== null}
	<slot />
{/if}
