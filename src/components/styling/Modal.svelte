<script lang="ts">
	export let title: string;
	export let id: string;
</script>

<div class="modal" {id}>
	<div class="header">
		<h1>{title}</h1>
		<button class="close"><i class="gg-close" /></button>
	</div>

	<div class="content">
		<slot />
	</div>
</div>

<style lang="scss">
	.modal {
		.header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 1rem;
			padding: 1rem;
			background-color: var(--background-color-1);
			border-radius: 0.5rem 0.5rem 0 0;

			h1 {
				font-size: 1.25rem;
				font-weight: 500;
				color: var(--text-color);
			}

			button {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 2rem;
				height: 2rem;
				background-color: var(--background-color-2);
				border-radius: 50%;
				border: none;
				outline: none;
				cursor: pointer;
				transition: background-color 0.2s ease-in-out;

				&:hover {
					background-color: var(--background-color-3);
				}
			}
		}

		.content {
			padding: 1rem;
			background-color: var(--background-color-2);
			border-radius: 0 0 0.5rem 0.5rem;
		}
	}
</style>
