import type Clerk from '@clerk/clerk-js';
import { writable, type Writable } from 'svelte/store';

export const clerk: Writable<Clerk | null> = writable();
