<script lang="ts">
	export let title;
	export let message =
		'This is likely not a problem on your end, however if this issue persists please contact support.';
</script>

<div class="error">
	<div class="title">
		<i class="gg-danger" />
		{title}
	</div>
	<div class="message">{message}</div>
</div>

<style lang="scss">
	.error {
		border: 1px solid #aa2222;

		& .title {
			background-color: #aa2222;
			padding: 1rem;
			display: flex;
			gap: 0.5rem;
			user-select: none;
		}

		& .message {
			padding: 1rem;
		}
	}
</style>
