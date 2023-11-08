import { extractMonthName, extractWTStudyDate } from './parsing_rules.js';

export const getMWBWeekDateEnhanced = (weekDate, mwbYear, lang) => {
	const { varDay, monthIndex } = extractMonthName(weekDate, lang);
	const result = `${mwbYear}/${String(monthIndex + 1).padStart(2, '0')}/${String(varDay).padStart(2, '0')}`;

	return result;
};

export const getWTStudyDateEnhanced = (src, lang) => {
	const { varDay, monthIndex, varYear } = extractWTStudyDate(src, lang);
	const result = `${varYear}/${String(monthIndex + 1).padStart(2, '0')}/${String(varDay).padStart(2, '0')}`;

	return result;
};
