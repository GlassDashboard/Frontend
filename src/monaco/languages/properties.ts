export default function properties(monaco) {
	monaco.languages.register({ id: 'properties' });
	monaco.languages.setMonarchTokensProvider('properties', {
		tokenizer: {
			root: [
				[/#.+/, 'properties-comment'],
				[/.+(?==)/, 'properties-key'],
				[/[^=]/, 'properties-value']
			]
		}
	});
}
