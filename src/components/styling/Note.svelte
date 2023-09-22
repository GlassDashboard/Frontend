<span>
	<slot />
</span>

<style>
	span::before {
		content: '* ';
		color: #660505;
		font-weight: bold;
		font-size: 1rem;
	}

	span {
		font-style: oblique;
		font-size: 0.8rem;
		color: var(--text-faded-color);
		user-select: none;
	}
</style>
