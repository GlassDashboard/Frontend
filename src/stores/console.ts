import { writable, type Writable } from 'svelte/store';

export const history: Writable<string[]> = writable([]);
