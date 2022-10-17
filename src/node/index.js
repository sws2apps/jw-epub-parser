import 'global-jsdom/register';
import JSZip from 'jszip';
import fetch from 'node-fetch';
import * as fs from 'fs';
import * as path from 'path';
import {
	getHtmlRawString,
	isValidEpubNaming,
	isValidFilename,
	isValidMwbSched,
	parseEpub,
} from '../common';

const loadEPUB = async (epubInput) => {
	const appZip = new JSZip();

	const validMwbFiles = [];
	let mwbYear;

	const initEpub = async (zip) => {
		const MAX_FILES = 300;
		const MAX_SIZE = 20000000; // 20 MO

		let fileCount = 0;
		let totalSize = 0;
		let targetDirectory = 'archive_tmp';

		for (let [filename, file] of Object.entries(zip.files)) {
			fileCount++;
			if (fileCount > MAX_FILES) {
				while (validMwbFiles.length > 0) {
					validMwbFiles.pop();
				}
				throw new Error('Reached max. number of files');
			}

			// Prevent ZipSlip path traversal (S6096)
			const resolvedPath = path.join(targetDirectory, filename);
			if (!resolvedPath.startsWith(targetDirectory)) {
				while (validMwbFiles.length > 0) {
					validMwbFiles.pop();
				}
				throw new Error('Path traversal detected');
			}

			const contentSize = await appZip.file(filename).async('ArrayBuffer');
			totalSize += contentSize.byteLength;
			if (totalSize > MAX_SIZE) {
				while (validMwbFiles.length > 0) {
					validMwbFiles.pop();
				}
				throw new Error('Reached max. size');
			}

			if (isValidFilename(filename)) {
				const content = await getHtmlRawString(zip, filename);

				const parser = new window.DOMParser();
				const htmlDoc = parser.parseFromString(content, 'text/html');

				if (isValidMwbSched(htmlDoc)) {
					validMwbFiles.push(htmlDoc);
				}
			}
		}
	};

	// check if we receive path or blob or url
	let data;
	if (epubInput.name) {
		if (isValidEpubNaming(epubInput.name)) {
			mwbYear = epubInput.name.split('_')[2].substring(0, 4);
			data = epubInput; // blob
		} else {
			throw new Error('The selected epub file has an incorrect naming.');
		}
	} else {
		const file = path.basename(epubInput.url || epubInput); // blob and url
		if (isValidEpubNaming(file)) {
			mwbYear = file.split('_')[2].substring(0, 4);
		} else {
			throw new Error('The selected epub file has an incorrect naming.');
		}

		if (epubInput.url) {
			const epubRes = await fetch(epubInput.url);
			const epubData = await epubRes.blob();
			data = await epubData.arrayBuffer();
		} else {
			data = epubInput; // blob
			const getDataFromPath = () => {
				return new Promise((resolve, reject) => {
					fs.readFile(epubInput, (err, data) => {
						if (err) {
							reject(err);
						} else {
							resolve(data);
						}
					});
				});
			};

			data = await getDataFromPath(); // path
		}
	}

	const doParsing = () => {
		return new Promise((resolve, reject) => {
			appZip.loadAsync(data).then(async (zip) => {
				await initEpub(zip);

				if (validMwbFiles.length === 0) {
					reject(
						'The file you provided is not a valid Meeting Workbook EPUB file. Please make sure that the file is correct.'
					);
				} else {
					resolve(parseEpub(validMwbFiles, mwbYear));
				}
			});
		});
	};

	const result = await doParsing();
	return result;
};

export { loadEPUB };
