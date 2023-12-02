import JSZip from 'jszip';
import { HTMLElement, parse } from 'node-html-parser';

export const isValidHTML = (name: string): boolean => {
	let valid = false;

	if (name.startsWith('OEBPS') && name.endsWith('.xhtml')) {
		const fileName = name.split('/')[1].split('.')[0];
		if (!isNaN(parseFloat(fileName))) {
			valid = true;
		}
	}

	return valid;
};

export const getHTMLString = async (zip: JSZip, filename: string): Promise<string> => {
	const content = await zip.file(filename)!.async('string');
	return content;
};

export const isValidMWBSchedule = (htmlDoc: HTMLElement): boolean => {
	let valid = false;
	let isValidTGW = false;
	let isValidAYF = false;
	let isValidLC = false;

	// pre-2024 mwb

	isValidTGW = htmlDoc.querySelector(`[class*=treasures]`) ? true : false;
	if (isValidTGW) {
		isValidAYF = htmlDoc.querySelector(`[class*=ministry]`) ? true : false;
		isValidLC = htmlDoc.querySelector(`[class*=christianLiving]`) ? true : false;
	}

	// 2024 onward
	if (!isValidTGW) {
		isValidTGW = htmlDoc.querySelector('.du-color--teal-700') ? true : false;
		if (isValidTGW) {
			isValidAYF = htmlDoc.querySelector('.du-color--gold-700') ? true : false;
			isValidLC = htmlDoc.querySelector('.du-color--maroon-600') ? true : false;
		}
	}

	if (isValidTGW === true && isValidAYF === true && isValidLC === true) {
		valid = true;
	}

	return valid;
};

export const HTMLParse = (htmlString: string): HTMLElement => {
	const htmlDoc = parse(htmlString);

	return htmlDoc;
};

export const isValidWSchedule = (htmlDoc: HTMLElement): boolean => {
	const valid = htmlDoc.querySelector('.groupTOC') ? true : false;
	return valid;
};
