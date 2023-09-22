import type Dropzone from 'dropzone';
import { writable, type Writable } from 'svelte/store';

export const dropzone: Writable<Dropzone | null> = writable();
