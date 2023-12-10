import JSZip from 'jszip';
import { HTMLElement } from 'node-html-parser';
import { HTMLParse, getHTMLString, isValidHTML, isValidMWBSchedule, isValidWSchedule } from './html_validation.js';

export const extractEPUBFiles = async (data: string | ArrayBuffer | Buffer | Blob) => {
	const appZip = new JSZip();

	const contents = await appZip.loadAsync(data);
	return contents;
};

export const validateEPUBContents = async (data: string | ArrayBuffer | Buffer | Blob) => {
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
		const resolvedPath = jw_epub_parser.path.join(targetDirectory, filename);
		if (!resolvedPath.startsWith(targetDirectory)) {
			result.isSuspicious = true;
		}

		const contentSize = await appZip.file(filename)!.async('arraybuffer');
		totalSize += contentSize.byteLength;
		if (totalSize > MAX_SIZE) {
			result.isBig = true;
		}
	}

	fileCount = 0;
	totalSize = 0;

	return result;
};

export const getHTMLDocs = async (zip: JSZip, isMWB: boolean, isW: boolean) => {
	const files = [];

	for (let [filename] of Object.entries(zip.files)) {
		const isValidFile = isValidHTML(filename);

		if (isValidFile) {
			const content = await getHTMLString(zip, filename);
			const htmlDoc = HTMLParse(content);

			const isValidSchedule = isMWB ? isValidMWBSchedule(htmlDoc) : isW ? isValidWSchedule(htmlDoc) : false;

			if (isValidSchedule) {
				files.push(htmlDoc);
			}
		}
	}

	return files;
};

export const getHTMLWTArticleDoc = async (zip: JSZip, articleFilename: string): Promise<HTMLElement> => {
	let article: HTMLElement;

	for (let [filename] of Object.entries(zip.files)) {
		const shortName = jw_epub_parser.path.basename(filename);
		if (shortName === articleFilename) {
			const content = await getHTMLString(zip, filename);
			const htmlDoc = HTMLParse(content);

			article = htmlDoc;
			break;
		}
	}

	return article!;
};
