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

		// Step: Start Parsing
		const data = parseMWBSchedule(htmlItem, mwbYear, mwbLang);
		return data;
	} catch (err) {
		console.error(err);
	}
};

export const parseW = (htmlString: string, wLang: string) => {
	try {
		// convert string to html
		const htmlItem = HTMLParse(htmlString).querySelector('.groupTOC')!;
		const article = htmlItem.querySelector('h3')!;

		// Step: Start Parsing
		const data = parseWSchedule(article, wLang);
		return data;
	} catch (err) {
		console.error(err);
	}
};
