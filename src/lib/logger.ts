const format = '%c[%c{level} %c{key}%c] %c{message}';
const css = [
	'color: #888',
	'color: {info_color}',
	'color: #69b',
	'color: #888',
	'color: #fff'
];

export type Level = 'INFO' | 'WARN' | 'ERROR';

const getCSSColor = (level: Level): string => {
	switch (level) {
		case 'INFO':
			return '#aaa';
		case 'WARN':
			return '#ff7';
		case 'ERROR':
			return '#f77';
		default:
			return '#fff';
	}
};

const getCSS = (level: Level): string[] => {
	return css.map((c) => c.replace('{info_color}', getCSSColor(level)));
};

const getFuncForLevel = (level: Level) => {
	return console.info;
};

export class Logger {
	constructor(private key: string) {}

	public log(level: Level, ...message: any[]) {
		getFuncForLevel(level)(
			format
				.replace('{level}', level)
				.replace('{key}', this.key.toUpperCase())
				.replace(
					'{message}',
					message
						.map((o) => {
							if (typeof o === 'object') return JSON.stringify(o);
							return o;
						})
						.join(' ')
				),
			...getCSS(level)
		);
	}

	public info(...message: any[]) {
		this.log('INFO', ...message);
	}

	public warn(...message: any[]) {
		this.log('WARN', ...message);
	}

	public error(...message: any[]) {
		this.log('ERROR', ...message);
	}

	public errorThenRetry(...message: any[]) {
		this.error(`${message}, retrying in 5 seconds...`);
		setTimeout(() => {
			location.reload();
		}, 5000);
	}
}
