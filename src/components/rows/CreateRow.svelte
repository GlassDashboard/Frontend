<div on:click>
	<span>+</span>
	Create Server
</div>

<style lang="scss">
	div {
		user-select: none;
		display: flex;
		align-items: center;
		gap: 0.5rem;

		width: 100%;
		height: 3rem;

		padding: 0.5rem 1rem;
		box-sizing: border-box;
		background-color: var(--background-color-1);
		transition: opacity 0.2s ease-in-out, background-color 0.2s ease-in-out;

		opacity: 0.4;
		border-radius: 0.1rem;

		&:hover {
			filter: none;
			cursor: pointer;

			background-color: var(--green-faded);
			opacity: 0.9;
		}

		& span {
			font-size: 1.5rem;
		}
	}
</style>
