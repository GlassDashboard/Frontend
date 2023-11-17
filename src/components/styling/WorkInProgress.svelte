<div>
	<span class="icon">🛠️</span>
	<p>Work in progress</p>
</div>

<style lang="scss">
	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		user-select: none;

		margin-top: 10rem;
		width: 100%;

		& .icon {
			font-size: 2rem;
			margin-right: 0.5rem;
			filter: grayscale(1);
			opacity: 0.4;
		}

		& p {
			font-size: 1.5rem;
			color: var(--text-faded-color);
			font-family: 'Open Sans', sans-serif;
		}
	}

	@media (max-height: 600px) {
		div {
			margin-top: 5rem;
		}
	}

	@media (max-height: 450px) {
		div {
			margin-top: 0;
		}
	}
</style>
