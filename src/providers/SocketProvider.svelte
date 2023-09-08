<script lang="ts">
	import { socket as store } from './../stores/socket';
	import { onDestroy, onMount } from 'svelte';
	import { PUBLIC_GLASS_SOCKET } from '$env/static/public';
	import { io } from 'socket.io-client';
	import Glass from '$lib/glass';

	export let uri = PUBLIC_GLASS_SOCKET;
	let attemptReconnect = true;

	onMount(async () => {
		const socket = io(uri, {
			path: '/',
			transports: ['websocket'],
			reconnection: false,
			autoConnect: false,
			auth: async (cb) => {
				cb({
					origin: 'panel',
					token: await Glass.user.getToken()
				});
			}
		});

		const reconnect = async () => {
			if (!attemptReconnect) return;
			socket.connect();
		};

		socket.on('disconnect', () => {
			setTimeout(reconnect, 1000);
		});

		socket.on('connect_error', (err) => {
			console.log('Failed to connect to socket', err);
			setTimeout(reconnect, 1000);
		});

		socket.connect();
		store.update(() => socket);
	});

	onDestroy(() => {
		// disconnect socket then destroy it
		store.update((socket) => {
			attemptReconnect = false;
			socket?.disconnect();
			return null;
		});
	});
</script>
