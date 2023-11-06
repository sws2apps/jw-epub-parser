import { parse } from 'node-html-parser';

export const isValidHTML = (name) => {
	let valid = false;

	if (name.startsWith('OEBPS') && name.endsWith('.xhtml')) {
		const fileName = name.split('/')[1].split('.')[0];
		if (!isNaN(fileName)) {
			valid = true;
		}
	}

	return valid;
};

export const getHTMLString = async (zip, filename) => {
	const content = await zip.file(filename).async('string');
	return content;
};

export const isValidMWBSchedule = (htmlDoc) => {
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

export const HTMLParse = (htmlString) => {
	const htmlDoc = parse(htmlString);

	return htmlDoc;
};

export const isValidWSchedule = (htmlDoc) => {
	const valid = htmlDoc.querySelector('.groupTOC') ? true : false;
	return valid;
};
