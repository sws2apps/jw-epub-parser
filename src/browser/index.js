import './utils.js';
import { getInputType, validateInput } from '../common/epub_validation.js';
import { parseMWBSchedule, parseWSchedule, startParse } from '../common/parser.js';
import { HTMLParse } from '../common/html_validation.js';

export const loadEPUB = async (epubInput) => {
	try {
		validateInput(epubInput);

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

export const parseMWB = (htmlString, mwbYear, mwbLang) => {
	try {
		// convert string to html
		const htmlItem = HTMLParse(htmlString);

		// Step: Start Parsing
		const data = parseMWBSchedule(htmlItem, mwbYear, mwbLang);
		return data;
	} catch (err) {
		console.error(err);
	}
};

export const parseW = (htmlString, wLang) => {
	try {
		// convert string to html
		const htmlItem = HTMLParse(HTMLParse(htmlString).querySelector('.groupTOC'));
		const article = htmlItem.querySelector('h3');

		// Step: Start Parsing
		const data = parseWSchedule(article, wLang);
		return data;
	} catch (err) {
		console.error(err);
	}
};
