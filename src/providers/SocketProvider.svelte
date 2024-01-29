<script lang="ts">
	import { socket as store } from './../stores/socket';
	import { onDestroy, onMount } from 'svelte';
	import { PUBLIC_GLASS_SOCKET } from '$env/static/public';
	import { io } from 'socket.io-client';
	import Glass from '$lib/glass';
	import { get } from 'svelte/store';
	import { server } from '../stores/server';
	import { Logger } from '$lib/logger';

	export let uri = PUBLIC_GLASS_SOCKET;
	const logger = new Logger('glass-ws');
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
			logger.info('Attempting to reconnect to socket');
			socket.connect();
		};

		socket.on('disconnect', () => {
			logger.info('Socket disconnected');
			setTimeout(reconnect, 1000);
		});

		socket.on('connect_error', (err) => {
			logger.error('Failed to connect to socket: ' + err);
			setTimeout(reconnect, 1000);
		});

		socket.on('connect', () => {
			logger.info('Connected to Glass');
		});

		socket.on('server:status', (data) => {
			const { id, status } = data;
			logger.info('Server ' + id + ' had its status changed to ' + status);

			server.update((s) => {
				if (s == null || s.id !== id) return s;
				return {
					...s,
					status
				};
			});
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
