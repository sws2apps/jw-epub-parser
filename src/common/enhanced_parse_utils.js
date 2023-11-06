import dateFormat from 'dateformat';
import { extractMonthName, extractWTStudyDate } from './parsing_rules.js';

export const getMWBWeekDateEnhanced = (weekDate, mwbYear, lang) => {
	const { varDay, monthIndex } = extractMonthName(weekDate, lang);
	const schedDate = new Date(mwbYear, monthIndex, varDay);

	return dateFormat(schedDate, 'yyyy/mm/dd');
};

export const getWTStudyDateEnhanced = (src, lang) => {
	const { varDay, monthIndex, varYear } = extractWTStudyDate(src, lang);
	const schedDate = new Date(varYear, monthIndex, varDay);
	return dateFormat(schedDate, 'yyyy/mm/dd');
};
