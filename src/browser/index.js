import { getInputType } from '../common/epub_validation.js';
import { startParse } from '../common/parser.js';
import './utils.js';

export const loadEPUB = async (epubInput) => {
	try {
		// Step: Validate Environment
		const { browser } = getInputType(epubInput);
		if (!browser) {
			throw new Error(
				'You are using the Browser version of jw-epub-parser. Please switch to the Node version if needed.'
			);
		}

		// Step: Start Parsing
		const data = await startParse(epubInput);
		return data;
	} catch (err) {
		console.error(err);
	}
};
