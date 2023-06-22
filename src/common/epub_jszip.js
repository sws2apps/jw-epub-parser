import JSZip from 'jszip';
import { HTMLParse, getHTMLString, isValidHTML, isValidMWBSchedule } from './html_validation.js';

export const extractEPUBFiles = async (data) => {
	const appZip = new JSZip();

	const contents = await appZip.loadAsync(data);
	return contents;
};

export const validateEPUBContents = async (data) => {
	const MAX_FILES = 300;
	const MAX_SIZE = 20000000; // 20 MO

	let fileCount = 0;
	let totalSize = 0;
	let targetDirectory = 'archive_tmp';

	const result = { isBig: false, isMore: false, isSuspicious: false };

	const appZip = new JSZip();
	const contents = await appZip.loadAsync(data);

	for (let [filename] of Object.entries(contents.files)) {
		fileCount++;
		if (fileCount > MAX_FILES) {
			result.isMore = true;
		}

		// Prevent ZipSlip path traversal (S6096)
		const resolvedPath = window.path.join(targetDirectory, filename);
		if (!resolvedPath.startsWith(targetDirectory)) {
			result.isSuspicious = true;
		}

		const contentSize = await appZip.file(filename).async('ArrayBuffer');
		totalSize += contentSize.byteLength;
		if (totalSize > MAX_SIZE) {
			result.isBig = true;
		}
	}

	fileCount = 0;
	totalSize = 0;

	return result;
};

export const getHTMLDocs = async (zip, isMWB, isW) => {
	const files = [];

	for (let [filename] of Object.entries(zip.files)) {
		const isValidFile = isValidHTML(filename);

		if (isValidFile) {
			const content = await getHTMLString(zip, filename);
			const htmlDoc = HTMLParse(content);

			const isValidSchedule = isMWB ? isValidMWBSchedule(htmlDoc) : false;

			if (isValidSchedule) {
				files.push(htmlDoc);
			}
		}
	}

	return files;
};
