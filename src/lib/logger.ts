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

	public log(level: Level, message: string) {
		getFuncForLevel(level)(
			format
				.replace('{level}', level)
				.replace('{key}', this.key.toUpperCase())
				.replace('{message}', message),
			...getCSS(level)
		);
	}

	public info(message: string) {
		this.log('INFO', message);
	}

	public warn(message: string) {
		this.log('WARN', message);
	}

	public error(message: string) {
		this.log('ERROR', message);
	}

	public errorThenRetry(message: string) {
		this.error(`${message}, retrying in 5 seconds...`);
		setTimeout(() => {
			location.reload();
		}, 5000);
	}
}
