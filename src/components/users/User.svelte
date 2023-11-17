<script lang="ts">
	import type { Subuser } from '$lib/glass/interfaces';
	export let user: Subuser;
</script>

<div class="user">
	<img src={user.avatar} alt={user.username} width="48px" />

	<div class="details">
		<span class="name">{user.username}</span>
		{#if user.owner}
			<span class="title owner">Server Owner</span>
		{:else}
			<span class="title guest">Guest</span>
		{/if}
	</div>

	<div class="buttons">
		{#if user.owner}
			<button class="modify" disabled><i class="gg-options" /></button>
			<button class="remove" disabled><i class="gg-trash" /></button>
		{:else}
			<button class="modify"><i class="gg-options" /></button>
			<button class="remove"><i class="gg-trash" /></button>
		{/if}
	</div>
</div>

<style lang="scss">
	.user {
		display: flex;
		align-items: center;
		gap: 1rem;
		background-color: var(--background-color-1);

		padding: 0.5rem 1rem;
		border-radius: 0.5rem;

		img {
			border-radius: 40%;
			user-select: none;
		}

		.details {
			display: flex;
			flex-direction: column;
			gap: 0.25rem;
		}

		.title {
			font-size: 0.8rem;
			color: var(--text-faded-color);
			user-select: none;

			&.owner {
				color: #d02f19;
				border-radius: 0.5rem;
			}

			&.guest {
				color: var(--text-faded-color);
				border-radius: 0.5rem;
			}
		}

		.buttons {
			margin-left: auto;
			display: flex;
			gap: 0.5rem;

			button {
				padding: 0.5rem 1rem;
				border-radius: 0.5rem;
				border: none;
				background: var(--background-secondary);
				color: var(--text-faded-color);
				font-size: 0.8rem;
				cursor: pointer;
				transition: 0.2s ease;

				&:not([disabled]) {
					&:hover {
						filter: brightness(1.4);
					}
				}

				&.remove {
					color: #b93a3a;
				}

				&.modify {
					color: #3a97b9;
				}

				&[disabled] {
					color: var(--text-faded-color);
					opacity: 0.3;
					cursor: not-allowed;
				}
			}
		}
	}
</style>
