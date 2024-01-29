export default function log(monaco) {
	monaco.languages.register({ id: 'log' });
	monaco.languages.setMonarchTokensProvider('log', {
		tokenizer: {
			root: [
				[/\[\d{1,2}:\d{1,2}:\d{1,2}\]/, 'log-time'],
				[/\[.+\]: /, 'log-thread'],
				[/\[[^\[\]]+\]/, 'log-plugin']
			]
		}
	});
}
