import type Clerk from '@clerk/clerk-js';
import { clerk } from '../../stores/clerk';
import type { ServerDetails, Server } from '$lib/glass/interfaces';
import { PUBLIC_GLASS_API } from '$env/static/public';
import axios, { type AxiosInstance, Axios } from 'axios';

async function getClerk(): Promise<Clerk | null> {
	return new Promise((resolve, _) => {
		const unsubscribe = clerk.subscribe((state) => {
			resolve(state);
		});

		unsubscribe();
	});
}

async function generateToken() {
	const clerk = await getClerk();
	if (!clerk) return null;

	return clerk.session?.getToken();
}

function parsePermission(value: string | bigint): bigint {
	if (typeof value === 'bigint') return value;
	if (!value.startsWith('bi:')) return 0n;
	return BigInt(value.slice(3));
}

let token: string;
let axiosInstance: AxiosInstance | null;

async function getAxios(): Promise<AxiosInstance> {
	if (axiosInstance) return axiosInstance;
	token = (await generateToken()) ?? '';

	axiosInstance = axios.create({
		baseURL: PUBLIC_GLASS_API,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		timeout: 5000
	});

	setTimeout(() => {
		axiosInstance = null;
	}, 50e3);

	return axiosInstance;
}

export const Glass = {
	async ping(): Promise<boolean> {
		return (await getAxios())
			.get('/ping')
			.then((r) => !r.data.error)
			.catch((e) => false);
	},
	user: {
		async getAllServers(): Promise<ServerDetails[] | []> {
			return (await getAxios())
				.get('/me/servers')
				.then((r) => r.data)
				.catch((e) => []);
		},

		async getServer(id: string): Promise<Server | null> {
			return (await getAxios())
				.get(`/server/${id}`)
				.then((r) => r.data)
				.catch((e) => null);
		},

		async getToken(): Promise<string | null> {
			return token;
		}
	},
	server: (server: string) => {
		return {
			get: async (): Promise<Server | null> => {
				return (await getAxios())
					.get(`/server/${server}`)
					.then((r) => r.data)
					.catch((e) => null);
			},

			resetToken: async () => {
				return (await getAxios())
					.post(`/server/${server}/token/reset`)
					.then((r) => r.data)
					.catch((e) => null);
			},

			delete: async () => {
				return (await getAxios())
					.delete(`/server/${server}`)
					.then((r) => r.data)
					.catch((e) => null);
			},

			create: async () => {
				return (await getAxios())
					.post(`/server/${server}`)
					.then((r) => r.data)
					.catch((e) => null);
			},

			users: {
				getAll: async () => {
					return (await getAxios())
						.get(`/server/${server}/user/all`)
						.then((r) =>
							r.data.map((u) => ({
								...u,
								permissions: parsePermission(u.permissions)
							}))
						)
						.catch((e) => null);
				}
			},

			file: (path: string) => {
				return {
					get: async () => {
						return (await getAxios())
							.get(`/server/${server}/file/${path}`)
							.then((r) => r.data)
							.catch((e) => null);
					},

					create: async (type: 'file' | 'directory' = 'file') => {
						return (await getAxios())
							.post(`/server/${server}/file/${path}?type=${type}`)
							.then((r) => r.data)
							.catch((e) => null);
					},

					delete: async () => {
						return (await getAxios())
							.delete(`/server/${server}/file/${path}`)
							.then((r) => r.data)
							.catch((e) => null);
					},

					write: async (content: string) => {
						return (await getAxios())
							.patch(`/server/${server}/file/${path}`, content)
							.then((r) => r.data)
							.catch((e) => null);
					},

					move: async (path: string) => {
						return (await getAxios())
							.put(`/server/${server}/file/${path}`, {
								path
							})
							.then((r) => r.data)
							.catch((e) => null);
					},

					copy: async (path: string) => {
						return (await getAxios())
							.put(`/server/${server}/file/${path}`, {
								path,
								copy: true
							})
							.then((r) => r.data)
							.catch((e) => null);
					},

					unarchive: async () => {
						return (await getAxios())
							.put(`/server/${server}/file/${path}`, {
								unarchive: true
							})
							.then((r) => r.data)
							.catch((e) => null);
					},

					upload: async (file: File) => {
						const formData = new FormData();
						formData.append('files', file);

						return (await getAxios())
							.post(`/server/${server}/file/${path}`, formData, {
								headers: {
									'Content-Type': 'multipart/form-data'
								}
							})
							.then((r) => r.data)
							.catch((e) => null);
					},

					uploadMultiple: async (file: File[]) => {
						const formData = new FormData();
						file.forEach((f) => formData.append('files', f));

						return (await getAxios())
							.post(`/server/${server}/file/${path}`, formData, {
								headers: {
									'Content-Type': 'multipart/form-data'
								}
							})
							.then((r) => r.data)
							.catch((e) => null);
					}
				};
			},
			console: {
				history: async () => {
					return (await getAxios())
						.get(`/server/${server}/console`)
						.then((r) => r.data)
						.catch((e) => null);
				},

				send: async (command: string) => {
					return (await getAxios())
						.post(`/server/${server}/console`, {
							command
						})
						.then((r) => r.data)
						.catch((e) => null);
				}
			}
		};
	}
};

export default Glass;
