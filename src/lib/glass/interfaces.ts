export const ServerState = ['SETUP', 'ONLINE', 'OFFLINE', 'SUSPENDED'] as const;
export type ServerState = (typeof ServerState)[number];

/**
 * @interface ServerDetails
 * @description The details of a server, these are always available, the results are also
 * personalized to the individual user.
 */
export interface ServerDetails {
	id: string;
	name: string;
	owner: string;

	serverType: string;
	setup: boolean;
	version: string;

	createdAt: number;
	lastOnline: number | null;
	status: ServerState;

	// Personalized
	role: string;
	permissions: bigint;
}

/**
 * @interface Server
 * @description Represents a full server, anything added on top of server
 * details here is only available when the server is online.
 */
export interface Server extends ServerDetails {}

/**
 * @interface FileMetadata
 * @description The metadata of a file, this contains all relevant information about the file, and optionally the content and children (one level deep)
 */
export interface FileMetadata {
	name: string;
	path: string;
	directory: boolean;
	size: number;
	lastModified: number;
	content: string | null;
	children: FileMetadata[];
}

/**
 * @interface Subuser
 * @description Minimal details about subusers associated with a server.
 */
export interface Subuser {
	id: string;
	permissions: bigint;
	username: string;
	avatar: string;
	owner: boolean;
}
