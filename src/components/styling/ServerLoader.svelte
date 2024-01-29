<script lang="ts">
	import Loader from './Loader.svelte';

	export let text: string;
	export let height: string = '25rem';
</script>

<div class="loading" style="height: {height}">
	<Loader />
	<p>{text}</p>
</div>

<style lang="scss">
	.loading {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: var(--background-color-1);
		border-radius: 8px;

		& p {
			text-align: center;
			width: 100%;

			&::after {
				content: '';
				animation: dots 2s step-end infinite;

				display: inline-block;
				width: 0;
			}
		}
	}

	@keyframes dots {
		0% {
			content: '';
		}
		25% {
			content: '.';
		}
		50% {
			content: '..';
		}
		75% {
			content: '...';
		}
	}
</style>
