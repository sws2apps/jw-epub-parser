import './utils.node.js';
import { parseMWBSchedule, parseWSchedule, startParse } from '../common/parser.js';
import { validateInput } from '../common/epub_validation.js';
import { HTMLParse } from '../common/html_validation.js';

export const loadEPUB = async (epubInput: string | Blob | { url: string }) => {
	try {
		validateInput(epubInput);

		const data = await startParse(epubInput);
		return data;
	} catch (err) {
		console.error(err);
	}
};

export const parseMWB = (htmlString: string, mwbYear: number, mwbLang: string) => {
	try {
		// convert string to html
		const htmlItem = HTMLParse(htmlString);
		const article = htmlItem.querySelector('article')!;

		// Step: Start Parsing
		const data = parseMWBSchedule(article, mwbYear, mwbLang);
		return data;
	} catch (err) {
		console.error(err);
	}
};

export const parseW = (articleString: string, contentString: string, wLang: string) => {
	try {
		// convert string to html
		const article = HTMLParse(articleString);
		const content = HTMLParse(contentString);

		// Step: Start Parsing
		const data = parseWSchedule(article, content, wLang);
		return data;
	} catch (err) {
		console.error(err);
	}
};
