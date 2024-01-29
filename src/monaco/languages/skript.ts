/**

@author https://github.com/liz3/SkIDE/blob/d58351912c6aa2cc6b97dfe3d18b58739211c609/src/main/resources/www/integrator.js

*/
export default function properties(monaco) {
	monaco.languages.register({ id: 'skript' });

	monaco.languages.setMonarchTokensProvider('skript', {
		keywords: [
			'set',
			'if',
			'stop',
			'loop',
			'return',
			'function',
			'options',
			'true',
			'false',
			'else',
			'else if',
			'trigger',
			'on',
			'while',
			'is',
			'effect',
			'expression',
			'command',
			'delete'
		],
		typeKeywords: ['player', 'integer', 'string', 'text'],
		operators: [
			'=',
			'>',
			'<',
			'!',
			'~',
			'?',
			':',
			'==',
			'<=',
			'>=',
			'!=',
			'&&',
			'||',
			'++',
			'--',
			'+',
			'-',
			'*',
			'/',
			'&',
			'|',
			'^',
			'%',
			'<<',
			'>>',
			'>>>',
			'+=',
			'-=',
			'*=',
			'/=',
			'&=',
			'|=',
			'^=',
			'%=',
			'<<=',
			'>>=',
			'>>>='
		],

		symbols: /[=><!~?:&|+\-*\/\^%]+/,

		escapes:
			/\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,

		tokenizer: {
			root: [
				[/\s+[^\}\s]+(?=\(.*\))/, 'function'],

				[
					/[a-z_$][\w$]*/,
					{
						cases: {
							'@typeKeywords': 'keyword',
							'@keywords': 'keyword',
							'@default': 'identifier'
						}
					}
				],
				[/\{([^{}]|%\{|}%)+}/, 'variable'],

				{ include: '@whitespace' },

				[/[{}()\[\]]/, '@brackets'],
				[/[<>](?!@symbols)/, '@brackets'],
				[
					/@symbols/,
					{
						cases: {
							'@operators': 'operator',
							'@default': ''
						}
					}
				],

				[/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
				[/0[xX][0-9a-fA-F]+/, 'number.hex'],
				[/\d+/, 'number'],

				[/[;,.]/, 'delimiter'],

				[/"([^"\\]|\\.)*$/, 'string.invalid'],
				[/"/, { token: 'string.quote', bracket: '@open', next: '@string' }],

				[/'[^\\']'/, 'string'],
				[/(')(@escapes)(')/, ['string', 'string.escape', 'string']]
			],

			string: [
				[/[^\\"]+/, 'string'],
				[/@escapes/, 'string.escape'],
				[/\\./, 'string.escape.invalid'],
				[/"/, { token: 'string.quote', bracket: '@close', next: '@pop' }]
			],

			whitespace: [
				[/[ \t\r\n]+/, 'white'],
				[/#[^]*/, 'comment']
			]
		}
	});

	monaco.languages.setLanguageConfiguration('skript', {
		comments: {
			lineComment: '#',
			blockComment: ['#', '']
		},
		autoClosingPairs: [
			{ open: '{', close: '}' },
			{ open: '[', close: ']' },
			{ open: '%', close: '%' },
			{ open: '(', close: ')' },
			{
				open: '"',
				close: '"',
				notIn: ['string']
			},
			{ open: "'", close: "'", notIn: ['string', 'comment'] },
			{
				open: '`',
				close: '`',
				notIn: ['string', 'comment']
			},
			{ open: '/**', close: ' */', notIn: ['string'] }
		]
	});

	monaco.languages.registerCodeActionProvider('skript', {
		provideCodeActions: function (model, range, context, token) {}
	});
	monaco.languages.registerLinkProvider('skript', {});
}
