import { JWEPUBParserError } from '../classes/error.js';
import { getMonthNames, getPartMinutesSeparatorVariations, getStudyArticleDateVariations } from './language_rules.js';

export const extractMonthName = (src, lang) => {
	let varDay;
	let monthIndex;

	const monthNames = getMonthNames(lang);

	for (const month of monthNames) {
		const monthLang = month.name;
		const regex = new RegExp(`(${monthLang.toLowerCase()})`);
		const array = regex.exec(src.toLowerCase());

		if (Array.isArray(array)) {
			varDay = +src.match(/(\d+)/)[0];
			monthIndex = month.index;
			break;
		}
	}

	if (typeof varDay === 'number' && typeof monthIndex === 'number') {
		return { varDay, monthIndex };
	}

	throw new JWEPUBParserError('week-date', `Parsing failed when extracting the week date. The input was: ${src}`);
};

export const extractSongNumber = (src) => {
	return +src.match(/(\d+)/)[0];
};

export const extractSourceEnhanced = (src, lang) => {
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
			const duration = +match[0].match(/\d+/)[0];
			const regexStartColumn = /^:/;
			const regexEndColumn = /:$/;

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

export const extractLastSong = (src) => {
	const temp = extractSongNumber(src);
	return temp > 151 ? src : temp;
};

export const extractWTStudyDate = (src, lang) => {
	const variations = getStudyArticleDateVariations(lang).split('|');

	const patternNumber = '{{ number }}';
	const patternDate = '{{ date }}';

	let varDay;
	let monthIndex;
	let varYear;

	for (const variation of variations) {
		let textSearch = variation.replace(patternDate, '');
		textSearch = textSearch.replace(patternNumber, '\\d+');

		const regex = new RegExp(textSearch.trim());
		const array = regex.exec(src);

		if (array !== null) {
			const dateStartIndex = array[0].length;
			if (dateStartIndex > 0) {
				const dateValue = src.substring(dateStartIndex);

				textSearch = dateValue.trim().split('–')[0];

				const monthNames = getMonthNames(lang);

				for (const month of monthNames) {
					const monthLang = month.name;
					const regex = new RegExp(`(${monthLang})`);
					const array2 = regex.exec(textSearch);

					if (Array.isArray(array2)) {
						varDay = +textSearch.match(/(\d+)/)[0];
						monthIndex = month.index;

						const findYear = /\b\d{4}\b/;
						const array3 = findYear.exec(dateValue);
						if (array3 !== null) {
							varYear = +array3[0];
						}
						break;
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
