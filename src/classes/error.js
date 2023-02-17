export class JWEPUBParserError extends Error {
	constructor(code, message) {
		super(message);

		this.code = `jw-epub-parser/failed-${code}`;
	}
}
