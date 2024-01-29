import log from './languages/log';
import properties from './languages/properties';
import skript from './languages/skript';

export function importThemes(monaco) {
	monaco.editor.defineTheme('custom', {
		base: 'vs-dark',
		inherit: true,
		rules: [
			// PROPERTIES
			{ token: 'properties-comment', foreground: '008800' },
			{ token: 'properties-key', foreground: 'D75E50' },
			{ token: 'properties-value', foreground: 'B09563' },
			{ token: 'properties-separator', foreground: 'D75E50' },

			// LOG
			{ token: 'log-time', foreground: 'D75E50' },
			{ token: 'log-thread', foreground: '508dd7' },
			{ token: 'log-plugin', foreground: 'd7a150' }
		],
		colors: {
			'editor.foreground': '#dddddd'
		}
	});

	properties(monaco); // import .properties language
	log(monaco); // import .log language
	skript(monaco); // import .sk language
}
