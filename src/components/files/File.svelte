<script lang="ts">
	import type { FileMetadata } from '$lib/glass/interfaces';

	export let metadata: FileMetadata;
	$: icon = metadata.directory ? 'folder' : 'insert_drive_file';
</script>

<div>
	<span class="material-icons icon {icon}">{icon}</span>
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
		&.folder {
			color: #ffa900;
		}

		&.insert_drive_file {
			color: #9e9e9e;
		}
	}
</style>
