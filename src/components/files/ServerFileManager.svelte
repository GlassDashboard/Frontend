<script lang="ts" context="module">
	export const FILE_MANAGER = Symbol('files');

	export type FileManager = {
		getPath: () => Writable<string>;
		getMetadata: () => Writable<FileMetadata>;
		back: (amount: number | undefined) => void;
		forward: (location: string) => void;
		getSelected: () => FileMetadata[];
		reload: () => void;
		isRoot: () => boolean;
	};
</script>

<script lang="ts">
	import type { FileMetadata, Server } from '$lib/glass/interfaces';
	import { onDestroy, onMount, setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import { socket } from '../../stores/socket';
	import Breadcrumbs from './Breadcrumbs.svelte';
	import File from './File.svelte';
	import Checkbox from '../styling/Checkbox.svelte';
	import { goto } from '$app/navigation';
	import type { PageData } from '../../routes/$types';
	import Glass from '$lib/glass';

	export let server: Server;
	export let data: PageData;

	let div: HTMLDivElement;
	let masterCheckbox: Checkbox | null = null;
	let checkboxes: Checkbox[] = [];
	let selected: FileMetadata[] = [];
	let shifting: boolean = false;
	let lastFile: FileMetadata | null = null;
	let lastClick: number = 0;
	let masterState: Writable<boolean> | undefined = undefined;
	$: if (masterCheckbox) masterState = masterCheckbox.state;

	const path = writable<string>('/');
	const metadata = writable<FileMetadata>();
	$: children = $metadata?.children?.sort(fileSorter) || [];

	const fileSorter = (a: FileMetadata, b: FileMetadata) => {
		if (a.directory && !b.directory) return -1;
		if (!a.directory && b.directory) return 1;
		return a.name.localeCompare(b.name);
	};

	const fetch = (path: string) => {
		$socket
			?.timeout(5000)
			.emit('file:metadata', path, (err: Error, data: FileMetadata) => {
				if (err) return;
				metadata.set(data);
			});
	};

	const setPath = (location: string) => {
		fetch(location);
		path.set(location);

		const url = data.current
			?.replace('[...data]', location.substring(1))
			.replace('[...tab]', 'files')
			.replace('[server]', server.id);

		if (!url) return;

		goto(url, {
			replaceState: false
		});
	};

	const manager: FileManager = {
		getPath: (): Writable<string> => path,
		getMetadata: (): Writable<FileMetadata> => metadata,
		back: (amount: number = 1) => {
			reset();
			let split = $path.split('/');

			for (let i = 0; i < amount; i++) {
				split.pop();
			}

			setPath(split.join('/') || '/');
		},
		forward: (location: string) => {
			reset();
			setPath(($path == '/' ? '/' : $path + '/') + location.replace(/^\//, ''));
		},
		getSelected: () => selected,
		reload: () => fetch($path),
		isRoot: () => $path === '/'
	};

	const reset = () => {
		resetSelected();
		lastClick = 0;
		lastFile = null;
	};

	const resetSelected = (exceptions: FileMetadata[] = []) => {
		for (const file of selected) {
			if (exceptions.includes(file)) continue;
			const checkbox = checkboxes[children.indexOf(file)];
			checkbox?.state?.set(false);
		}
	};

	const onKeyToggle = (e: KeyboardEvent) => {
		if (e.key === 'Shift') shifting = e.type === 'keydown';
	};

	const handleClick = (file: FileMetadata) => {
		const checkbox = checkboxes[children.indexOf(file)];

		if (!shifting) resetSelected([file]);
		checkbox.state?.update((current) => !current);

		if (
			!shifting &&
			file.directory &&
			Date.now() - lastClick < 500 &&
			lastFile === file
		) {
			manager.forward(file.name);
			checkbox.state?.set(false);
		}

		lastClick = Date.now();
		lastFile = file;
	};

	const handleCheckbox = (event: CustomEvent<boolean>, file: FileMetadata) => {
		if (event.detail) {
			if (!selected.includes(file)) selected.push(file);
		} else selected.splice(selected.indexOf(file), 1);

		const anySelected = selected.length > 0;
		if (masterState && $masterState != anySelected)
			masterState.set(anySelected);
	};

	const handleMaster = () => {
		const clicked = $masterState;
		if (clicked) {
			for (const checkbox of checkboxes) {
				checkbox.state?.set(true);
			}
		} else {
			resetSelected();
		}
	};

	const upload = () => {
		const input = document.createElement('input');
		input.type = 'file';
		input.multiple = true;
		input.click();

		input.addEventListener('change', () => {
			if (!input.files) return;
			const files = Array.from(input.files);
			Glass.server(server.id).file('file.txt').write('Hello World!');
		});
	};

	onMount(() => {
		document.addEventListener('keydown', onKeyToggle);
		document.addEventListener('keyup', onKeyToggle);

		$socket?.emit('server:attach', server.id);
		setTimeout(() => {
			fetch($path);
		}, 200);
	});

	onDestroy(() => {
		$socket?.emit('server:detach');
		document.removeEventListener('keydown', onKeyToggle);
		document.removeEventListener('keyup', onKeyToggle);
	});

	setContext(FILE_MANAGER, manager);
</script>

<svelte:head>
	<link rel="stylesheet" href="/context-menu/theme.css" />
</svelte:head>

<div bind:this={div} class="manager">
	<div class="header">
		<Checkbox bind:this={masterCheckbox} on:click={handleMaster} />
		<Breadcrumbs path={$path} />
		<div class="controls">
			<div class="control">
				<span on:click={() => upload()} class="material-icons icon"
					>file_upload</span
				>
			</div>
		</div>
	</div>

	{#each children as file, index}
		<div class="file" on:click={() => handleClick(file)}>
			<Checkbox
				bind:this={checkboxes[index]}
				on:state={(e) => handleCheckbox(e, file)}
			/>
			<File metadata={file} />
		</div>
	{/each}
</div>

<style lang="scss">
	.header {
		display: flex;
		align-items: center;
		padding: 0.5rem 1rem;
		background-color: var(--background-color-1);
		border-radius: 0.1rem;
		margin: 1rem 0;
		gap: 0.5rem;
	}

	.file {
		display: flex;
		align-items: center;
		padding: 0.5rem 1rem;
		background-color: var(--background-color-1);
		border-radius: 0.1rem;
		gap: 0.5rem;
		transition: all 0.1s linear 0.04s;
	}

	.file:hover {
		background-color: var(--background-color-2);
		transition-delay: 0s;
		gap: 0.7rem;
	}

	.manager {
		padding-bottom: 10vh;
	}

	.controls {
		margin-left: auto;

		& > .control {
			display: flex;
			align-items: center;
			cursor: pointer;
			transition: color 0.1s linear;

			&:hover {
				color: var(--color);
			}
		}
	}
</style>
