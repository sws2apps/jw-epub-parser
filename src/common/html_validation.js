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
	const parser = new window.DOMParser();
	const htmlDoc = parser.parseFromString(htmlString, 'text/html');

	return htmlDoc;
};

export const getHTMLDocsFromRaws = (htmlRaws) => {
	const files = [];

	for (const content of htmlRaws) {
		const htmlDoc = HTMLParse(content);
		files.push(htmlDoc);
	}

	return files;
};
