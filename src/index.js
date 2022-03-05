import JSZip from 'jszip';
import * as fs from 'fs';
import * as path from 'path';

let validMwbFiles = [];
let mwbYear;

const loadEPUB = async (epubInput) => {
	// check if we receive path or blob
	let data;
	if (epubInput.name) {
		if (isValidEpubNaming(epubInput.name)) {
			mwbYear = epubInput.name.split('_')[2].substring(0, 4);
			data = epubInput; // blob
		} else {
			throw new Error('The selected epub file has an incorrect naming.');
		}
	} else {
		const file = path.basename(epubInput);

		if (isValidEpubNaming(file)) {
			data = epubInput; // blob
			mwbYear = file.split('_')[2].substring(0, 4);
		} else {
			throw new Error('The selected epub file has an incorrect naming.');
		}

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

	const doParsing = () => {
		return new Promise((resolve, reject) => {
			JSZip.loadAsync(data).then(async (zip) => {
				await initEpub(zip);

				if (validMwbFiles.length === 0) {
					reject(
						'The file you provided is not a valid Meeting Workbook EPUB file. Please make sure that the file is correct.'
					);
				} else {
					resolve(parseEpub(validMwbFiles));
				}
			});
		});
	};

	const result = await doParsing();
	return result;
};

const isValidEpubNaming = (name) => {
	let regex = /^mwb_[A-Z][A-Z]?[A-Z]?_202\d(0[1-9]|1[0-2])\.epub$/i;
	return regex.test(name);
};

const initEpub = async (zip) => {
	const MAX_FILES = 300;
	const MAX_SIZE = 20000000; // 20 MO

	let fileCount = 0;
	let totalSize = 0;
	let targetDirectory = 'archive_tmp';

	for (const file in zip.files) {
		fileCount++;
		if (fileCount > MAX_FILES) {
			while (validMwbFiles.length > 0) {
				validMwbFiles.pop();
			}
			throw new Error('Reached max. number of files');
		}

		// Prevent ZipSlip path traversal (S6096)
		const resolvedPath = path.join(targetDirectory, file);
		if (!resolvedPath.startsWith(targetDirectory)) {
			while (validMwbFiles.length > 0) {
				validMwbFiles.pop();
			}
			throw new Error('Path traversal detected');
		}

		const contentSize = await zip.file(file).async('nodebuffer');
		totalSize += contentSize.length;
		if (totalSize > MAX_SIZE) {
			while (validMwbFiles.length > 0) {
				validMwbFiles.pop();
			}
			throw new Error('Reached max. size');
		}

		if (isValidFilename(file)) {
			const content = await getHtmlRawString(zip, file);

			const parser = new window.DOMParser();
			const htmlDoc = parser.parseFromString(content, 'text/html');

			if (isValidMwbSched(htmlDoc)) {
				validMwbFiles.push(htmlDoc);
			}
		}
	}
};

const isValidFilename = (name) => {
	if (name.startsWith('OEBPS') && name.endsWith('.xhtml')) {
		const fileName = name.split('/')[1].split('.')[0];
		if (!isNaN(fileName)) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
};

const getHtmlRawString = async (zip, filename) => {
	const content = await zip.file(filename).async('string');

	return content;
};

const isValidMwbSched = (htmlDoc) => {
	const isValidTGW = htmlDoc.querySelector(`[class*=treasures]`) ? true : false;
	const isValidAYF = htmlDoc.querySelector(`[class*=ministry]`) ? true : false;
	const isValidLC = htmlDoc.querySelector(`[class*=christianLiving]`)
		? true
		: false;

	if (isValidTGW === true && isValidAYF === true && isValidLC === true) {
		return true;
	} else {
		return false;
	}
};

const parseEpub = (htmlDocs) => {
	let obj = {};
	let weeksData = [];
	let weeksCount;

	weeksCount = htmlDocs.length;

	obj.weeksCount = weeksCount;
	obj.mwbYear = mwbYear;

	for (let a = 0; a < weeksCount; a++) {
		let weekItem = {};

		const htmlItem = htmlDocs[a];

		// get week date
		const wdHtml = htmlItem.getElementsByTagName('h1').item(0);
		const weekDate = wdHtml.textContent;

		weekItem.weekDate = weekDate;

		// get weekly Bible Reading
		const wbHtml = htmlItem.getElementsByTagName('h2').item(0);
		weekItem.weeklyBibleReading = wbHtml.textContent;

		let src = '';
		let cnLC = 0;

		// get number of assignments in Apply Yourself Parts
		const cnAYF = htmlItem
			.querySelector('#section3')
			.querySelectorAll('li').length;

		// get number of assignments in Living as Christians Parts
		const lcLiLength = htmlItem
			.querySelector('#section4')
			.querySelectorAll('li').length;
		cnLC = lcLiLength === 6 ? 2 : 1;

		// get elements with meeting schedule data: pGroup
		const pGroupData = htmlItem.querySelectorAll('.pGroup');
		pGroupData.forEach((pGroup) => {
			let pgData = pGroup.querySelectorAll('p');
			pgData.forEach((p) => {
				src += '|' + p.textContent;
			});
		});

		src.replace(/\u00A0/g, ' '); // remove non-breaking space
		let toSplit = src.split('|');

		// First song
		weekItem.songFirst = toSplit[1].match(/(\d+)/)[0];

		// 10min TGW Source
		weekItem.tgw10Talk = toSplit[3].trim();

		//Bible Reading Source
		weekItem.tgwBRead = toSplit[7].trim();

		// AYF Part Count
		weekItem.ayfCount = cnAYF;

		//AYF1 Source
		weekItem.ayfPart1 = toSplit[8].trim();

		if (cnAYF > 1) {
			//AYF2 Source
			weekItem.ayfPart2 = toSplit[9].trim();
		}

		if (cnAYF > 2) {
			//AYF3 Source
			weekItem.ayfPart3 = toSplit[10].trim();
		}

		if (cnAYF > 3) {
			//AYF4 Source
			weekItem.ayfPart4 = toSplit[11].trim();
		}

		// Middle song
		let nextIndex = cnAYF > 3 ? 12 : cnAYF > 2 ? 11 : cnAYF > 1 ? 10 : 9;
		weekItem.songMiddle = toSplit[nextIndex].match(/(\d+)/)[0];

		// LC Part Count
		weekItem.lcCount = cnLC;

		// 1st LC part
		nextIndex++;
		weekItem.lcPart1 = toSplit[nextIndex].trim();

		if (cnLC === 2) {
			// 1st LC part
			nextIndex++;
			weekItem.lcPart2 = toSplit[nextIndex].trim();
		}

		// CBS Source
		nextIndex++;
		weekItem.lcCBS = toSplit[nextIndex].trim();

		// Concluding Song
		nextIndex++;
		nextIndex++;
		weekItem.songConclude = toSplit[nextIndex].match(/(\d+)/)[0];

		weeksData.push(weekItem);
	}

	obj.weeksData = weeksData;

	return obj;
};

export { loadEPUB };
