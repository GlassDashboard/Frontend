<script lang="ts">
	import Glass from '$lib/glass';
	import type { Server } from '$lib/glass/interfaces';

	export let server: Server;

	let users = Glass.server(server.id).users.getAll();
</script>
