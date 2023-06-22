import languages from '../locales/languages.js';
import {
	getMWBAYFEnhanced,
	getMWBCBSEnhanced,
	getMWBLCEnhanced,
	getMWBTGWBibleReadingEnhanced,
	getMWBTGWTalkEnhanced,
	getMWBWeekDateEnhanced,
} from './enhanced_parse_utils.js';
import { extractEPUBFiles, getHTMLDocs, validateEPUBContents } from './epub_jszip.js';
import {
	getEPUBData,
	getEPUBFileName,
	getEPUBLanguage,
	getEPUBYear,
	isMWBEpub,
	isValidEPUB,
	isValidEPUBIssue,
	isWEpub,
} from './epub_validation.js';
import {
	getMWBAYFCount,
	getMWBLCCount,
	getMWBSources,
	getMWBWeekDate,
	getMWBWeeklyBibleReading,
} from './html_utils.js';
import { getHTMLDocsFromRaws } from './html_validation.js';
import { extractLastSong, extractSongNumber } from './parsing_rules.js';

export const startParse = async (epubInput) => {
	const isRawsHTML = epubInput.htmlRaws ? true : false;
	let result = {};

	if (!isRawsHTML) {
		const isValidName = isValidEPUB(epubInput);
		if (!isValidName) {
			throw new Error('The selected epub file has an incorrect naming.');
		}

		const isValiIssue = isValidEPUBIssue(epubInput);
		if (!isValiIssue) {
			throw new Error(
				'EPUB import is only supported for Meeting Workbook starting on July 2022, and for Watchtower Study starting on April 2023.'
			);
		}

		const epubBuffer = await getEPUBData(epubInput);
		const epubCheck = await validateEPUBContents(epubBuffer);

		if (epubCheck.isBig) {
			throw new Error('EPUB file seems to be large. Extract aborted.');
		}

		if (epubCheck.isMore) {
			throw new Error('EPUB file seems to contain more files than expected. Extract aborted.');
		}

		if (epubCheck.isSuspicious) {
			throw new Error('EPUB file seems to be suspicious. Extract aborted.');
		}

		const epubFilename = getEPUBFileName(epubInput);
		const isMWB = isMWBEpub(epubFilename);
		const isW = isWEpub(epubFilename);

		const epubContents = await extractEPUBFiles(epubBuffer);

		const htmlDocs = await getHTMLDocs(epubContents, isMWB, isW);

		if (htmlDocs.length === 0) {
			throw new Error(
				`The file you provided is not a valid ${
					isMWB ? 'Meeting Workbook' : 'Watchtower Study'
				} EPUB file. Please make sure that the file is correct.`
			);
		}

		const epubYear = getEPUBYear(epubInput);
		const epubLang = getEPUBLanguage(epubInput);

		if (isMWB) {
			result = await parseMWBEpub({ htmlDocs, epubYear, epubLang, fromHTML: false });
		}
	}

	if (isRawsHTML) {
		const htmlDocs = getHTMLDocsFromRaws(epubInput.htmlRaws);

		if (epubInput.isMWB) {
			result = await parseMWBEpub({
				htmlDocs,
				epubYear: epubInput.epubYear,
				epubLang: epubInput.epubLang,
				fromHTML: true,
			});
		}
	}

	return result;
};

const parseMWBEpub = async ({ htmlDocs, epubYear, epubLang, fromHTML }) => {
	const obj = {};
	const weeksData = [];

	const isEnhancedParsing = languages.find((language) => language.code === epubLang);

	obj.weeksCount = htmlDocs.length;
	obj.mwbYear = epubYear;

	for (const htmlItem of htmlDocs) {
		const weekItem = {};

		// get week date
		const weekDate = getMWBWeekDate(htmlItem, fromHTML);

		if (isEnhancedParsing) {
			const weekDateEnhanced = getMWBWeekDateEnhanced(weekDate, epubYear, epubLang);
			weekItem.weekDate = weekDateEnhanced;
			weekItem.weekDateLocale = weekDate;
		} else {
			weekItem.weekDate = weekDate;
		}

		// get weekly Bible Reading
		weekItem.weeklyBibleReading = getMWBWeeklyBibleReading(htmlItem, fromHTML);

		// compile all sources
		const src = getMWBSources(htmlItem);
		let splits = src.split('|');
		let tmpSrc = '';

		// First song
		weekItem.songFirst = extractSongNumber(splits[1]);

		// 10min TGW Source
		tmpSrc = splits[3].trim();
		if (isEnhancedParsing) {
			weekItem.tgwTalk = getMWBTGWTalkEnhanced(tmpSrc, epubLang);
		} else {
			weekItem.tgwTalk = tmpSrc;
		}

		//Bible Reading Source
		tmpSrc = splits[7].trim();
		if (isEnhancedParsing) {
			weekItem.tgwBRead = getMWBTGWBibleReadingEnhanced(tmpSrc, epubLang);
		} else {
			weekItem.tgwBRead = tmpSrc;
		}

		// get number of assignments in Apply Yourself Parts
		const cnAYF = getMWBAYFCount(htmlItem);

		// AYF Part Count
		weekItem.ayfCount = cnAYF;

		//AYF1 Source
		tmpSrc = splits[8].trim();
		if (isEnhancedParsing) {
			const partEnhanced = getMWBAYFEnhanced(tmpSrc, epubLang);
			weekItem.ayfPart1 = partEnhanced.src;
			weekItem.ayfPart1Time = partEnhanced.time;
			weekItem.ayfPart1Type = partEnhanced.type;
		} else {
			weekItem.ayfPart1 = tmpSrc;
		}

		//AYF2 Source
		if (cnAYF > 1) {
			tmpSrc = splits[9].trim();
			if (isEnhancedParsing) {
				const partEnhanced = getMWBAYFEnhanced(tmpSrc, epubLang);
				weekItem.ayfPart2 = partEnhanced.src;
				weekItem.ayfPart2Time = partEnhanced.time;
				weekItem.ayfPart2Type = partEnhanced.type;
			} else {
				weekItem.ayfPart2 = tmpSrc;
			}
		}

		//AYF3 Source
		if (cnAYF > 2) {
			tmpSrc = splits[10].trim();
			if (isEnhancedParsing) {
				const partEnhanced = getMWBAYFEnhanced(tmpSrc, epubLang);
				weekItem.ayfPart3 = partEnhanced.src;
				weekItem.ayfPart3Time = partEnhanced.time;
				weekItem.ayfPart3Type = partEnhanced.type;
			} else {
				weekItem.ayfPart3 = tmpSrc;
			}
		}

		// AYF4 Source
		if (cnAYF > 3) {
			tmpSrc = splits[11].trim();
			if (isEnhancedParsing) {
				const partEnhanced = getMWBAYFEnhanced(tmpSrc, epubLang);
				weekItem.ayfPart4 = partEnhanced.src;
				weekItem.ayfPart4Time = partEnhanced.time;
				weekItem.ayfPart4Type = partEnhanced.type;
			} else {
				weekItem.ayfPart4 = tmpSrc;
			}
		}

		// Middle song
		let nextIndex = cnAYF > 3 ? 12 : cnAYF > 2 ? 11 : cnAYF > 1 ? 10 : 9;
		weekItem.songMiddle = extractSongNumber(splits[nextIndex]);

		// get number of assignments in Living as Christians Parts
		const cnLC = getMWBLCCount(htmlItem);

		// LC Part Count
		weekItem.lcCount = cnLC;

		// 1st LC part
		nextIndex++;

		tmpSrc = splits[nextIndex].trim();
		if (isEnhancedParsing) {
			const lcEnhanced = getMWBLCEnhanced(tmpSrc, epubLang);
			weekItem.lcPart1 = lcEnhanced.title;
			weekItem.lcPart1Time = lcEnhanced.time;
			if (lcEnhanced.content && lcEnhanced.content !== '') {
				weekItem.lcPart1Content = lcEnhanced.content;
			}
		} else {
			weekItem.lcPart1 = tmpSrc;
		}

		// 2nd LC part
		if (cnLC === 2) {
			nextIndex++;
			tmpSrc = splits[nextIndex].trim();

			if (isEnhancedParsing) {
				const lcEnhanced = getMWBLCEnhanced(tmpSrc, epubLang);
				weekItem.lcPart2 = lcEnhanced.title;
				weekItem.lcPart2Time = lcEnhanced.time;
				if (lcEnhanced.content && lcEnhanced.content !== '') {
					weekItem.lcPart2Content = lcEnhanced.content;
				}
			} else {
				weekItem.lcPart2 = tmpSrc;
			}
		}

		// CBS Source
		nextIndex++;
		tmpSrc = splits[nextIndex].trim();

		if (isEnhancedParsing) {
			weekItem.lcCBS = getMWBCBSEnhanced(tmpSrc, epubLang);
		} else {
			weekItem.lcCBS = tmpSrc;
		}

		// Concluding Song
		nextIndex++;
		nextIndex++;
		tmpSrc = splits[nextIndex].trim();
		weekItem.songConclude = extractLastSong(tmpSrc);

		weeksData.push(weekItem);
	}

	obj.weeksData = weeksData;

	return obj;
};
