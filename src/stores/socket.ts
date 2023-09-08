import type { Socket } from 'socket.io-client';
import { writable, type Writable } from 'svelte/store';

export const socket: Writable<Socket | null> = writable();
