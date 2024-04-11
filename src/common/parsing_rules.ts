import { JWEPUBParserError } from '../classes/error.js';
import { getMonthNames, getPartMinutesSeparatorVariations, getStudyArticleDateVariations } from './language_rules.js';

export const extractMonthName = (src: string, lang: string) => {
	let varDay;
	let monthIndex;

	const text = src.toLowerCase();
	const separators = ['bis', '–', '-', '—'];
	const regex = new RegExp(separators.join('|'), 'gi');
	const split = text.split(regex);
	const monthNames = getMonthNames(lang);

	outerLoop: for (const splitted of split) {
		for (const month of monthNames) {
			const monthLang = month.name.toLowerCase();
			let searchKey = `(${monthLang})`;

			if (lang === 'J') {
				searchKey = `\\b${searchKey}\\b`;
			}

			const regex = new RegExp(searchKey);
			const array = regex.exec(splitted);

			if (Array.isArray(array)) {
				const regex = /\d+/g;
				const match = text.match(regex);

				if (lang === 'J') {
					varDay = +match![1];
				}

				if (lang !== 'J') {
					varDay = +match![0];
				}

				monthIndex = month.index;
				break outerLoop;
			}
		}
	}

	if (typeof varDay === 'number' && typeof monthIndex === 'number') {
		return { varDay, monthIndex };
	}

	throw new JWEPUBParserError('week-date', `Parsing failed when extracting the week date. The input was: ${src}`);
};

export const extractSongNumber = (src: string) => {
	const parseNum = src.match(/(\d+)/);

	if (parseNum && parseNum.length > 0) {
		const firstNumber = +parseNum[0];

		if (firstNumber <= 158) {
			return firstNumber;
		}
	}

	return src;
};

export const extractSourceEnhanced = (src: string, lang: string) => {
	const variations = getPartMinutesSeparatorVariations(lang).split('|');

	let result;

	for (const variation of variations) {
		let textSearch = variation.replace('{{ duration }}', '\\d+');
		textSearch = textSearch.replace('(', '\\(');
		textSearch = textSearch.replace(')', '\\)');
		textSearch = textSearch.replace(') ', ') ?');
		textSearch = textSearch.replace('??', '?');

		const regex = new RegExp(textSearch.trim());
		const match = src.match(regex);

		if (match) {
			const splits = src.split(regex);
			const duration = +match[0].match(/\d+/)![0];
			const regexStartColumn = /^[:.「]/;
			const regexEndColumn = /[:」]$/;

			const tmpAssignment = splits[0].trim();
			const source = splits[1].trim().replace(regexStartColumn, '').replace(regexEndColumn, '').trim();

			const indexSep = /\d{1,2}[-.] /g;
			const index = tmpAssignment.match(indexSep);
			const assignmentSplits = tmpAssignment.split(indexSep);
			let assignment;

			if (index) {
				assignment = assignmentSplits[1].trim();
			} else {
				assignment = tmpAssignment;
			}

			assignment = assignment.replace(regexStartColumn, '').replace(regexEndColumn, '').trim();

			result = { type: assignment, time: duration, src: source };
		}
	}

	if (result) return result;

	throw new JWEPUBParserError('jw-epub-parser', `Parsing failed. The input was: ${src}`);
};

export const extractWTStudyDate = (src: string, lang: string) => {
	let varDay;
	let monthIndex;
	let varYear;

	const variations = getStudyArticleDateVariations(lang).split('|');

	const patternNumber = '{{ number }}';
	const patternDate = '{{ date }}';

	src = src.toLowerCase();

	outerLoop: for (const variation of variations) {
		let textSearch = variation.toLowerCase().replace(patternDate, '');
		textSearch = textSearch.replace(patternNumber, '\\d+');

		const regex = new RegExp(textSearch.trim());
		const array = regex.exec(src);

		if (array !== null) {
			const dateStartIndex = array[0].length;
			if (dateStartIndex > 0) {
				const dateValue = src.substring(dateStartIndex);

				textSearch = dateValue.trim();

				const text = textSearch.toLowerCase();
				const separators = ['bis', '–', '-', '—', 'do'];
				const regex = new RegExp(separators.join('|'), 'gi');
				const split = text.split(regex);
				const monthNames = getMonthNames(lang);

				for (const splitted of split) {
					for (const month of monthNames) {
						const monthLang = month.name.toLowerCase();
						let searchKey = `(${monthLang})`;

						if (lang === 'J') {
							searchKey = `\\b${searchKey}\\b`;
						}

						const regex = new RegExp(searchKey);
						const array2 = regex.exec(splitted);

						if (Array.isArray(array2)) {
							const regex = /\d+/g;
							const match = textSearch.match(regex);

							if (lang === 'J') {
								varDay = +match![2];
							}

							if (lang !== 'J') {
								varDay = +match![0];
							}

							monthIndex = month.index;

							const findYear = /\b\d{4}\b/;
							const array3 = findYear.exec(dateValue);
							if (array3 !== null) {
								varYear = +array3[0];
							}

							break outerLoop;
						}
					}
				}
			}
		}
	}

	if (typeof varDay === 'number' && typeof monthIndex === 'number' && typeof varYear === 'number') {
		return { varDay, monthIndex, varYear };
	}

	throw new JWEPUBParserError('wtstudy', `Parsing failed for Watchtower Study Date. The input was: ${src}`);
};
