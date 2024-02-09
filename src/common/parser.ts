import JSZip from 'jszip';
import { HTMLElement } from 'node-html-parser';
import languages from '../locales/languages.js';
import { getMWBWeekDateEnhanced, getWTStudyDateEnhanced } from './enhanced_parse_utils.js';
import { extractEPUBFiles, getHTMLDocs, getHTMLWTArticleDoc, validateEPUBContents } from './epub_jszip.js';
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
	getWSTudySongs,
	getWStudyArticles,
	getWStudyDate,
	getWStudyTitle,
} from './html_utils.js';
import { extractSongNumber, extractSourceEnhanced } from './parsing_rules.js';
import { MWBSchedule, WSchedule } from '../types/index.js';

export const startParse = async (epubInput: string | Blob | { url: string }) => {
	let result = {};

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

	if (isW && htmlDocs.length > 1) {
		throw new Error(
			`The file you provided is not a valid Watchtower Study EPUB file. Please make sure that the file is correct.`
		);
	}

	const epubYear = getEPUBYear(epubInput);
	const epubLang = getEPUBLanguage(epubInput);

	if (isMWB) {
		result = await parseMWBEpub({ htmlDocs, epubYear, epubLang });
	}

	if (isW) {
		result = await parseWEpub({ htmlItem: htmlDocs[0], epubLang, epubContents });
	}

	return result;
};

export const parseMWBSchedule = (htmlItem: HTMLElement, mwbYear: number, mwbLang: string) => {
	const isEnhancedParsing = languages.find((language) => language.code === mwbLang);

	const weekItem = {} as MWBSchedule;

	// get week date
	const weekDate = getMWBWeekDate(htmlItem);

	if (isEnhancedParsing) {
		const weekDateEnhanced = getMWBWeekDateEnhanced(weekDate, mwbYear, mwbLang);
		weekItem.mwb_week_date = weekDateEnhanced;
		weekItem.mwb_week_date_locale = weekDate;
	} else {
		weekItem.mwb_week_date = weekDate;
	}

	// get weekly Bible Reading
	weekItem.mwb_weekly_bible_reading = getMWBWeeklyBibleReading(htmlItem);

	// compile all sources
	const src = getMWBSources(htmlItem);
	let splits = src.split('@');
	let tmpSrc = '';

	// First song
	weekItem.mwb_song_first = extractSongNumber(splits[1]) as number;

	// 10min TGW Source
	tmpSrc = splits[3].trim();
	if (isEnhancedParsing) {
		weekItem.mwb_tgw_talk = extractSourceEnhanced(tmpSrc, mwbLang).type;
	} else {
		weekItem.mwb_tgw_talk = tmpSrc;
	}

	//Bible Reading Source
	tmpSrc = splits[7].trim();
	if (isEnhancedParsing) {
		weekItem.mwb_tgw_bread = extractSourceEnhanced(tmpSrc, mwbLang).src;
	} else {
		weekItem.mwb_tgw_bread = tmpSrc;
	}

	// get number of assignments in Apply Yourself Parts
	const cnAYF = getMWBAYFCount(htmlItem);

	// AYF Part Count
	weekItem.mwb_ayf_count = cnAYF;

	//AYF1 Source
	tmpSrc = splits[8].trim();
	if (isEnhancedParsing) {
		const partEnhanced = extractSourceEnhanced(tmpSrc, mwbLang);
		weekItem.mwb_ayf_part1 = partEnhanced.src;
		weekItem.mwb_ayf_part1_time = partEnhanced.time;
		weekItem.mwb_ayf_part1_type = partEnhanced.type;
	} else {
		weekItem.mwb_ayf_part1 = tmpSrc;
	}

	//AYF2 Source
	if (cnAYF > 1) {
		tmpSrc = splits[9].trim();
		if (isEnhancedParsing) {
			const partEnhanced = extractSourceEnhanced(tmpSrc, mwbLang);
			weekItem.mwb_ayf_part2 = partEnhanced.src;
			weekItem.mwb_ayf_part2_time = partEnhanced.time;
			weekItem.mwb_ayf_part2_type = partEnhanced.type;
		} else {
			weekItem.mwb_ayf_part2 = tmpSrc;
		}
	}

	//AYF3 Source
	if (cnAYF > 2) {
		tmpSrc = splits[10].trim();
		if (isEnhancedParsing) {
			const partEnhanced = extractSourceEnhanced(tmpSrc, mwbLang);
			weekItem.mwb_ayf_part3 = partEnhanced.src;
			weekItem.mwb_ayf_part3_time = partEnhanced.time;
			weekItem.mwb_ayf_part3_type = partEnhanced.type;
		} else {
			weekItem.mwb_ayf_part3 = tmpSrc;
		}
	}

	// AYF4 Source
	if (cnAYF > 3) {
		tmpSrc = splits[11].trim();
		if (isEnhancedParsing) {
			const partEnhanced = extractSourceEnhanced(tmpSrc, mwbLang);
			weekItem.mwb_ayf_part4 = partEnhanced.src;
			weekItem.mwb_ayf_part4_time = partEnhanced.time;
			weekItem.mwb_ayf_part4_type = partEnhanced.type;
		} else {
			weekItem.mwb_ayf_part4 = tmpSrc;
		}
	}

	// Middle song
	let nextIndex = cnAYF > 3 ? 12 : cnAYF > 2 ? 11 : cnAYF > 1 ? 10 : 9;
	weekItem.mwb_song_middle = extractSongNumber(splits[nextIndex]);

	// get number of assignments in Living as Christians Parts
	const cnLC = getMWBLCCount(htmlItem);

	// LC Part Count
	weekItem.mwb_lc_count = cnLC;

	// 1st LC part
	nextIndex++;

	tmpSrc = splits[nextIndex].trim();
	if (isEnhancedParsing) {
		const lcEnhanced = extractSourceEnhanced(tmpSrc, mwbLang);
		weekItem.mwb_lc_part1 = lcEnhanced.type;
		weekItem.mwb_lc_part1_time = lcEnhanced.time;
		if (lcEnhanced.src && lcEnhanced.src !== '') {
			weekItem.mwb_lc_part1_content = lcEnhanced.src;
		}
	} else {
		weekItem.mwb_lc_part1 = tmpSrc;
	}

	// 2nd LC part
	if (cnLC === 2) {
		nextIndex++;
		tmpSrc = splits[nextIndex].trim();

		if (isEnhancedParsing) {
			const lcEnhanced = extractSourceEnhanced(tmpSrc, mwbLang);
			weekItem.mwb_lc_part2 = lcEnhanced.type;
			weekItem.mwb_lc_part2_time = lcEnhanced.time;
			if (lcEnhanced.src && lcEnhanced.src !== '') {
				weekItem.mwb_lc_part2_content = lcEnhanced.src;
			}
		} else {
			weekItem.mwb_lc_part2 = tmpSrc;
		}
	}

	// CBS Source
	nextIndex++;
	tmpSrc = splits[nextIndex].trim();

	if (isEnhancedParsing) {
		weekItem.mwb_lc_cbs = extractSourceEnhanced(tmpSrc, mwbLang).src;
	} else {
		weekItem.mwb_lc_cbs = tmpSrc;
	}

	// Concluding Song
	nextIndex++;
	nextIndex++;
	tmpSrc = splits[nextIndex].trim();
	weekItem.mwb_song_conclude = extractSongNumber(tmpSrc);

	return weekItem;
};

export const parseWSchedule = (article: HTMLElement, content: HTMLElement, wLang: string) => {
	const isEnhancedParsing = languages.find((language) => language.code === wLang);

	const weekItem = {} as WSchedule;

	const studyDate = getWStudyDate(article);

	if (studyDate.length > 0) {
		if (isEnhancedParsing) {
			const wStudyEnhanced = getWTStudyDateEnhanced(studyDate, wLang);
			weekItem.w_study_date = wStudyEnhanced;
			weekItem.w_study_date_locale = studyDate;
		} else {
			weekItem.w_study_date = studyDate;
		}
	}

	const studyTitle = getWStudyTitle(article);
	weekItem.w_study_title = studyTitle;

	const pubRefs = content.querySelectorAll('.pubRefs');

	const openingSongText = pubRefs.at(0)!;
	weekItem.w_study_opening_song = extractSongNumber(openingSongText.textContent) as number;

	let concludingSongText = <HTMLElement>pubRefs.at(-1);

	if (pubRefs.length === 2) {
		const blockTeach = content.querySelector('.blockTeach');
		concludingSongText = blockTeach!.nextElementSibling!;
	}

	weekItem.w_study_concluding_song = extractSongNumber(concludingSongText.textContent) as number;

	return weekItem;
};

const parseMWBEpub = async ({
	htmlDocs,
	epubYear,
	epubLang,
}: {
	htmlDocs: HTMLElement[];
	epubYear: number;
	epubLang: string;
}) => {
	const weeksData = [];

	for (const htmlItem of htmlDocs) {
		const weekItem = parseMWBSchedule(htmlItem, epubYear, epubLang);
		weeksData.push(weekItem);
	}

	return weeksData;
};

const parseWEpub = async ({
	htmlItem,
	epubLang,
	epubContents,
}: {
	htmlItem: HTMLElement;
	epubLang: string;
	epubContents: JSZip;
}) => {
	const weeksData = [];

	const studyArticles = getWStudyArticles(htmlItem);

	for (const [_, studyArticle] of studyArticles.entries()) {
		const articleLink = studyArticle.nextElementSibling!.querySelector('a')!.getAttribute('href') as string;
		const content = await getHTMLWTArticleDoc(epubContents, articleLink);

		const weekItem = parseWSchedule(studyArticle, content, epubLang);
		weeksData.push(weekItem);
	}

	return weeksData;
};
