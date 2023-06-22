import dateFormat from 'dateformat';
import {
	extractAYFAssignment,
	extractCBSSource,
	extractLCAssignment,
	extractMonthName,
	extractTGWBibleReading,
	extractTGWTalk,
} from './parsing_rules.js';

export const getMWBWeekDateEnhanced = (weekDate, mwbYear, lang) => {
	const { varDay, monthIndex } = extractMonthName(weekDate, lang);
	const schedDate = new Date(mwbYear, monthIndex, varDay);

	return dateFormat(schedDate, 'mm/dd/yyyy');
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
