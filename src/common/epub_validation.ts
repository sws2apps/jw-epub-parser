export const isMWBEpub = (name: string) => {
	let regex = /^mwb_[A-Z][A-Z]?[A-Z]?_202\d(0[1-9]|1[0-2])\.epub$/i;
	return regex.test(name);
};

export const isWEpub = (name: string) => {
	let regex = /^w_[A-Z][A-Z]?[A-Z]?_202\d(0[1-9]|1[0-2])\.epub$/i;
	return regex.test(name);
};

export const validateInput = (input: string | { url: string } | Blob) => {
	if (!input) {
		throw new Error('You did not pass anything to the loadEPUB function.');
	}
};

export const getInputType = (input: string | { url: string } | Blob) => {
	const result = { browser: false, node: true };

	if (typeof input === 'object' && 'url' in input) {
		result.browser = true;
	} else if (input instanceof Blob && 'name' in input) {
		result.browser = true;
	}

	return result;
};

export const getEPUBFileName = (input: string | { url: string } | Blob) => {
	let filename: string;

	if (typeof input === 'object' && 'url' in input) {
		filename = input.url;
	} else if (input instanceof Blob && 'name' in input) {
		filename = input.name as string;
	} else {
		filename = input as string;
	}

	return jw_epub_parser.path.basename(filename);
};

export const isValidEPUB = (input: string | { url: string } | Blob) => {
	const epubFilename = getEPUBFileName(input);
	const isMWB = isMWBEpub(epubFilename);
	const isW = isWEpub(epubFilename);

	return isMWB || isW;
};

export const isValidEPUBIssue = (input: string | { url: string } | Blob) => {
	let valid = true;

	const epubFilename = getEPUBFileName(input);
	const isMWB = isMWBEpub(epubFilename);
	const isW = isWEpub(epubFilename);

	const type = isMWB ? 'mwb' : isW ? 'w' : undefined;

	const issue = +epubFilename.split('_')[2].split('.epub')[0];

	if (type === 'mwb' && issue < 202207) valid = false;
	if (type === 'w' && issue < 202304) valid = false;

	return valid;
};

export const getEPUBYear = (input: string | { url: string } | Blob) => {
	const filename = getEPUBFileName(input);
	return +filename.split('_')[2].substring(0, 4);
};

export const getEPUBLanguage = (input: string | { url: string } | Blob) => {
	const filename = getEPUBFileName(input);
	return filename.split('_')[1];
};

export const getEPUBData = async (input: string | { url: string } | Blob) => {
	let result: Blob | ArrayBuffer | Buffer;

	if (input instanceof Blob) {
		result = input;
	}

	if (typeof input === 'object' && 'url' in input) {
		const epubRes = await fetch(input.url);
		if (epubRes.status !== 200) {
			throw new Error('EPUB file could not be downloaded. Check the URL you provided.');
		}
		const epubData = await epubRes.blob();
		const data = await epubData.arrayBuffer();

		result = data;
	}

	if (typeof input === 'string') {
		const data = await jw_epub_parser.readFile(input);
		result = data;
	}

	return result!;
};
