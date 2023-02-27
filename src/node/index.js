import 'global-jsdom/register';
import JSZip from 'jszip';
import fetch from 'node-fetch';
import * as fs from 'fs';
import * as path from 'path';
import { getHtmlRawString, isValidEpubNaming, isValidFilename, isValidMwbSched, parseEpub } from '../common.js';
import {
	assignmentsVariations,
	assignmentsName,
	cbsVariations,
	concludingSongFormat,
	livingPartsVariations,
	monthNames,
	tgw10Variations,
	tgwBibleReadingVariations,
} from './languageRules.js';

const loadEPUB = async (epubInput) => {
	const appZip = new JSZip();

	const validMwbFiles = [];
	let mwbYear;
	let lang;
	let skipZip = false;

	// check if we receive path or blob or url or html
	let data;
	if (epubInput.name) {
		if (isValidEpubNaming(epubInput.name)) {
			const issue = +epubInput.name.split('_')[2].split('.epub')[0];
			if (issue >= 202207) {
				mwbYear = epubInput.name.split('_')[2].substring(0, 4);
				lang = epubInput.name.split('_')[1];
				data = epubInput; // blob
			} else {
				throw new Error('EPUB import is only supported for Meeting Workbook starting on July 2022');
			}
		} else {
			throw new Error('The selected epub file has an incorrect naming.');
		}
	} else if (epubInput.htmlRaws) {
		skipZip = true;

		for (const content of epubInput.htmlRaws) {
			const parser = new window.DOMParser();
			const htmlDoc = parser.parseFromString(content, 'text/html');

			validMwbFiles.push(htmlDoc);
		}
	} else {
		const file = path.basename(epubInput.url || epubInput); // blob and url
		if (isValidEpubNaming(file)) {
			const issue = +file.split('_')[2].split('.epub')[0];
			if (issue >= 202207) {
				mwbYear = file.split('_')[2].substring(0, 4);
				lang = file.split('_')[1];
			} else {
				throw new Error('EPUB import is only supported for Meeting Workbook starting on July 2022');
			}
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

	const doParsing = () => {
		return new Promise((resolve, reject) => {
			if (skipZip) {
				resolve(
					parseEpub(validMwbFiles, epubInput.mwbYear, epubInput.lang, true, {
						monthNames: monthNames,
						tgw10Variations: tgw10Variations,
						tgwBibleReadingVariations: tgwBibleReadingVariations,
						assignmentsName: assignmentsName,
						assignmentsVariations: assignmentsVariations,
						livingPartsVariations: livingPartsVariations,
						cbsVariations: cbsVariations,
						concludingSongFormat: concludingSongFormat,
					})
				);
			}

			if (!skipZip) {
				appZip.loadAsync(data).then(async (zip) => {
					await initEpub(zip);

					if (validMwbFiles.length === 0) {
						reject(
							'The file you provided is not a valid Meeting Workbook EPUB file. Please make sure that the file is correct.'
						);
					} else {
						resolve(
							parseEpub(validMwbFiles, mwbYear, lang, false, {
								monthNames: monthNames,
								tgw10Variations: tgw10Variations,
								tgwBibleReadingVariations: tgwBibleReadingVariations,
								assignmentsName: assignmentsName,
								assignmentsVariations: assignmentsVariations,
								livingPartsVariations: livingPartsVariations,
								cbsVariations: cbsVariations,
								concludingSongFormat: concludingSongFormat,
							})
						);
					}
				});
			}
		});
	};

	const result = await doParsing();
	return result;
};

export { loadEPUB };
