<script lang="ts">
	import type { FileMetadata } from '$lib/glass/interfaces';

	export let metadata: FileMetadata;
	$: icon = metadata.directory ? 'folder' : 'file';
</script>

<div>
	<div class="icon">
		<span class="gg-{icon}" />
	</div>
	{metadata.name}
</div>

<style lang="scss">
	div {
		border-radius: 0.1rem;
		width: 100%;
		display: flex;
		align-items: center;
		gap: 0.3rem;
		user-select: none;
	}

	.icon {
		width: 24px;
		display: flex;
		align-items: center;
		justify-content: center;

		& .gg-folder {
			color: #ffa900;
		}

		& .gg-file {
			color: #9e9e9e;
		}
	}
</style>
