import type { Server } from '$lib/glass/interfaces';
import { writable, type Writable } from 'svelte/store';

export const server: Writable<Server | null> = writable();
