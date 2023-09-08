<script lang="ts">
	import { socket } from './../../stores/socket';
	import { history } from './../../stores/console';
	import Glass from '$lib/glass';
	import type { Server } from '$lib/glass/interfaces';
	import { onDestroy, onMount } from 'svelte';
	import Loader from '../styling/Loader.svelte';
	import type { Terminal } from 'xterm';
	import type { FitAddon } from 'xterm-addon-fit';

	let elem: HTMLElement;
	let input: HTMLInputElement;

	let historyIndex = -1;
	let loading = true;
	let firstLine = true;
	let term: Terminal | null = null;
	let fitAddon: FitAddon | null = null;

	export let server: Server;

	const load = (_) => {
		// we do async here to prevent typescript from complaining about the return signature
		(async () => {
			const { Terminal } = await import('xterm');
			const { FitAddon } = await import('xterm-addon-fit');
			const { WebLinksAddon } = await import('xterm-addon-web-links');

			fitAddon = new FitAddon();

			term = new Terminal({
				fontFamily: 'JetBrains Mono',
				fontWeight: '300'
			});

			term.write(`\x1b[?25l`);
			term.writeln = (data) => {
				term?.write((!firstLine ? '\r\n' : '') + data);
				firstLine = false;
			};

			new ResizeObserver(() => {
				fitAddon?.fit();
			}).observe(elem);

			fetchLogs((logs) => {
				term?.loadAddon(fitAddon!);
				term?.loadAddon(new WebLinksAddon());

				fitAddon?.fit();

				logs.forEach((log) => {
					term?.writeln(log);
				});

				try {
					term?.open(elem);
				} catch (_) {}

				loading = false;
			});
		})();
	};

	const fetchLogs = (success) => {
		Glass.server(server.id)
			.console.history()
			.then((logs) => {
				if (!logs) return setTimeout(() => fetchLogs(success), 1000);
				success(logs);
			});
	};

	const execute = () => {
		const command = input.value;
		if (!command) return;

		input.value = '';
		history.update((c) => [command, ...c.slice(1, 10)]);
		historyIndex = -1;

		$socket?.emit('console:execute', command);
	};

	const handleHistory = (e: KeyboardEvent) => {
		const prev = historyIndex;

		if ($history.length == 0) return;

		if (e.key === 'ArrowUp') {
			if (historyIndex === -1) {
				history.update((c) => [input.value, ...c]);
				historyIndex++;
			}

			historyIndex++;
		} else if (e.key === 'ArrowDown') {
			historyIndex--;

			if (historyIndex == 0) {
				const value = $history[historyIndex];
				historyIndex--;

				input.value = value;
				updateInput();

				$history = $history.slice(1);
				return;
			}
		} else return;

		const value = $history[historyIndex];
		if (value) {
			input.value = value;
			updateInput();
		} else {
			historyIndex = prev;
			e.preventDefault();
		}
	};

	const updateInput = () => {
		input.focus();

		setTimeout(() => {
			input.selectionStart = input.selectionEnd = input.value.length;
		}, 1);
	};

	$socket?.on('console:log', (log) => {
		term?.writeln(log);
	});

	onMount(() => {
		$socket?.emit('server:attach', server.id);
	});

	onDestroy(() => {
		$socket?.emit('server:detach');
		$socket?.off('console:log');
	});
</script>

<head>
	<link rel="stylesheet" href="/css/xterm.css" />
</head>

<div class="wrapper">
	<div class="container">
		<div bind:this={elem} use:load />
	</div>

	{#if loading}
		<div class="loader">
			<Loader />
			<p>Connecting to console</p>
		</div>

		<div class="loader" />
	{:else}
		<form class="command" on:submit|preventDefault={execute}>
			<span>$</span>
			<input type="text" bind:this={input} on:keydown={handleHistory} />
		</form>
	{/if}
</div>

<style lang="scss">
	.wrapper {
		background-color: var(--background-color-1) !important;
		padding: 0.5rem;
		border-radius: 0.5rem;
		box-sizing: border-box;

		height: 50vh;
		position: relative;

		display: flex;
		flex-direction: column;
		align-items: center;
	}

	// make container take up most the space, but leave a little room for the command input
	.container {
		width: 100%;
		height: calc(100% - 2rem);

		& > div {
			width: 100%;
			height: 100%;
		}
	}

	.loader {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		& p {
			text-align: center;
			width: 100%;

			&::after {
				content: '';
				animation: dots 2s step-end infinite;

				display: inline-block;
				width: 0;
			}
		}
	}

	@keyframes dots {
		0% {
			content: '';
		}
		25% {
			content: '.';
		}
		50% {
			content: '..';
		}
		75% {
			content: '...';
		}
	}

	.command {
		width: 100%;
		height: 2rem;
		display: flex;
		flex-direction: row;
		align-items: center;

		background-color: var(--background-color-2);
		border: none;
		border-radius: 0.5rem;
		margin-top: 0.5rem;

		& span {
			padding: 0.5rem;
			font-size: 1rem;
			border: none;
			border-radius: 0.5rem 0 0 0.5rem;
			user-select: none;
			color: var(--text-color);
		}

		& input {
			padding: 0.5rem 0;
			padding-right: 1rem;
			font-size: 1rem;
			background-color: transparent;
			border: none;
		}
	}
</style>
