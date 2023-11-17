<script>
	import { Logger } from '$lib/logger';
	import { clerk } from '../../stores/clerk';

	const logger = new Logger('sign-in');
	$: if ($clerk) {
		logger.info(
			$clerk.user === undefined
				? 'The user is no longer logged in'
				: 'The user is now logged in'
		);
	}
</script>

{#if !$clerk || $clerk.user === undefined}
	<slot name="loading" />
{:else if $clerk.user !== null}
	<slot />
{/if}
