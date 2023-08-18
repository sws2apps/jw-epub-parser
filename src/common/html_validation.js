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

	const isValidTGW = htmlDoc.querySelector(`[class*=treasures]`) ? true : false;
	const isValidAYF = htmlDoc.querySelector(`[class*=ministry]`) ? true : false;
	const isValidLC = htmlDoc.querySelector(`[class*=christianLiving]`) ? true : false;

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
