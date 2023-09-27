import dateFormat from 'dateformat';
import {
	extractAYFAssignment,
	extractCBSSource,
	extractLCAssignment,
	extractMonthName,
	extractTGWBibleReading,
	extractTGWTalk,
	extractWTStudyDate,
} from './parsing_rules.js';

export const getMWBWeekDateEnhanced = (weekDate, mwbYear, lang) => {
	const { varDay, monthIndex } = extractMonthName(weekDate, lang);
	const schedDate = new Date(mwbYear, monthIndex, varDay);

	return dateFormat(schedDate, 'yyyy/mm/dd');
};

export const getMWBTGWTalkEnhanced = (src, lang) => {
	return extractTGWTalk(src, lang);
};

export const getMWBTGWBibleReadingEnhanced = (src, lang) => {
	return extractTGWBibleReading(src, lang);
};

export const getMWBAYFEnhanced = (src, lang) => {
	return extractAYFAssignment(src, lang);
};

export const getMWBLCEnhanced = (src, lang) => {
	return extractLCAssignment(src, lang);
};

export const getMWBCBSEnhanced = (src, lang) => {
	return extractCBSSource(src, lang);
};

export const getWTStudyDateEnhanced = (src, lang) => {
	const { varDay, monthIndex, varYear } = extractWTStudyDate(src, lang);
	const schedDate = new Date(varYear, monthIndex, varDay);
	return dateFormat(schedDate, 'yyyy/mm/dd');
};
