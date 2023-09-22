import { writable, type Writable } from 'svelte/store';

export class FileUploadQueue {
	private array: globalThis.File[] = [];
	private uploader: (files: globalThis.File[]) => Promise<void>;
	private chunk: number = 1;
	private delay: number = 1000;
	private timeout: number = 0;
	private uploading: number = 0;

	constructor(
		chunk: number,
		delay: number,
		uploader: (files: globalThis.File[]) => Promise<void>
	) {
		this.chunk = chunk;
		this.delay = delay;
		this.uploader = uploader;
	}

	private async call() {
		// Sort this so that they're grouped by directory
		this.uploader(this.array.splice(0, this.chunk));

		if (this.array.length > 0)
			this.timeout = setTimeout(() => {
				this.call();
			}, this.delay);
		else {
			this.uploading = 0;
		}
	}

	public async push(file: globalThis.File) {
		this.pushAll([file]);
	}

	public async pushAll(files: globalThis.File[]) {
		if (this.timeout) clearTimeout(this.timeout);
		this.array.push(...files);
		this.uploading += files.length;

		this.timeout = setTimeout(() => {
			this.array.sort((a, b) => {
				if (a.webkitRelativePath < b.webkitRelativePath) return -1;
				if (a.webkitRelativePath > b.webkitRelativePath) return 1;
				return 0;
			});

			this.call();
		}, this.delay);
	}

	public size(): number {
		return this.array.length;
	}

	public total(): number {
		return this.uploading;
	}
}
