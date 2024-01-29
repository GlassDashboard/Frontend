<script lang="ts">
	import type { FileMetadata } from '$lib/glass/interfaces';
	import * as monaco from 'monaco-editor';
	import { onDestroy, onMount } from 'svelte';
	import { importThemes } from '../../monaco/themes';

	export let file: FileMetadata;
	let editorElem: HTMLDivElement;
	let editor: monaco.editor.IStandaloneCodeEditor | null = null;

	onMount(() => {
		importThemes(monaco);

		editor = monaco.editor.create(editorElem!, {
			automaticLayout: true,
			language: getLanguageForExt(
				file.name.substring(file.name.lastIndexOf('.') + 1)
			),
			theme: 'custom',
			value: file.content ?? ''
		});
	});

	onDestroy(() => {
		editor?.dispose();
	});

	const getLanguageForExt = (ext: string) => {
		switch (ext) {
			case 'js':
				return 'javascript';
			case 'ts':
				return 'typescript';
			case 'json':
				return 'json';
			case 'yml':
				return 'yaml';
			case 'sk':
				return 'skript';
			default:
				return ext;
		}
	};
</script>

<div bind:this={editorElem}></div>

<style lang="scss">
	:global(.monaco-editor) {
		height: 30rem !important;
	}
</style>
