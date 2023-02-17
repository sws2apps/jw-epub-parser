import { JWEPUBParserError } from '../classes/error.js';

export const extractMonthName = (monthNames, src, lang) => {
	let varDay;
	let monthIndex;

	for (let i = 0; i < monthNames.length; i++) {
		const month = monthNames[i];
		const monthLang = month.names[lang];
		const regex = new RegExp(`(${monthLang})`);
		const array = regex.exec(src);

		if (Array.isArray(array)) {
			varDay = +src.match(/(\d+)/)[0];
			monthIndex = month.index;
			break;
		}
	}

	return { varDay, monthIndex };
};

export const extractTitleTGW10 = (tgw10Variations, src, lang) => {
	const variations = tgw10Variations[lang].split('|');
	const pattern = '{{ title }}';

	let result;
	for (let i = 0; i < variations.length; i++) {
		const variation = variations[i];
		const startIndex = variation.indexOf(pattern);
		const endIndex = src.length - variation.replace('{{ title }}', '').length + startIndex;
		const extracted = src.substring(startIndex, endIndex);
		const verifyExtract = variation.replace('{{ title }}', extracted);
		if (verifyExtract === src) {
			result = extracted;
			break;
		}
	}

	if (result) return result;

	throw new JWEPUBParserError('tgw-talk', 'Parsing failed for Treasures from God’s Word part');
};

export const extractSourceTGWBibleReading = (tgwBibleReadingVariations, src, lang) => {
	const variations = tgwBibleReadingVariations[lang].split('|');

	let result;
	for (let i = 0; i < variations.length; i++) {
		const variation = variations[i];

		const patternSource = '{{ source }}';
		const patternStudy = '{{ study }}';

		const startIndexSource = variation.indexOf(patternSource);
		let endIndexSource = startIndexSource + patternSource.length;
		const startIndexStudy = variation.indexOf(patternStudy);

		const splitter = variation.substring(endIndexSource, startIndexStudy);

		const textSplit = src.substring(startIndexSource, src.length);
		const split = textSplit.split(splitter);

		let extractedSource;
		let studyText;

		if (split.length === 2) {
			extractedSource = split[0];
			studyText = split[1];
		}

		if (split.length > 2) {
			extractedSource = '';
			for (let a = 0; a < split.length; a++) {
				const item = split[a];

				extractedSource += item + ' ';
				if (a === split.length - 2) {
					break;
				}
			}

			studyText = split[split.length - 1];
			extractedSource = extractedSource.trim();
		}

		if (extractedSource) {
			const value = '\\d+';
			const regex = new RegExp(value);
			const array = regex.exec(studyText);

			const extractedStudy = array !== null ? array[0] : undefined;

			let verifyExtract = variation.replace('{{ source }}', extractedSource);
			verifyExtract = verifyExtract.replace('{{ study }}', extractedStudy);

			if (verifyExtract === src) {
				result = {
					src: extractedSource,
					study: +extractedStudy,
				};
				break;
			}
		}
	}

	if (result) return result;

	throw new JWEPUBParserError('tgw-bibleReading', 'Parsing failed for Bible Reading part');
};

export const extractSourceAssignments = (assignmentsVariations, assignmentsName, src, lang) => {
	try {
		const variations = assignmentsVariations[lang].split('|');

		const patternAssignment = '{{ assignment }}';
		const patternDuration = '{{ duration }}';
		const patternSource = '{{ source }}';

		let result;
		for (let i = 0; i < variations.length; i++) {
			const variation = variations[i];

			const patternSourceIndex = variation.indexOf(patternSource);
			const findRoundOne = variation.substring(0, patternSourceIndex).trim();

			let assignmentsList = '(';
			for (let a = 0; a < assignmentsName.length; a++) {
				assignmentsList += assignmentsName[a][lang];

				if (a < assignmentsName.length - 1) {
					assignmentsList += '|';
				}
			}
			assignmentsList += ')';

			let textSearch = findRoundOne.replace('{{ duration }}', '\\d+');
			textSearch = textSearch.replace('(', '(\\(');
			textSearch = textSearch.replace(')', ')\\)');
			textSearch = textSearch.replace(' :', ' ?:?');
			textSearch = textSearch.replace(') ', ') ?');
			textSearch = textSearch.replace('??', '?');
			textSearch = textSearch.replace(patternAssignment, assignmentsList);

			const regex = new RegExp(textSearch.trim());
			const array = regex.exec(src);

			if (array !== null) {
				const partTiming = +array[2].match(/(\d+)/)[0];

				let textSearch = findRoundOne.replace('{{ assignment }}', '');
				textSearch = textSearch.replace('{{ duration }}', partTiming);

				const split = src.split(textSearch.trim());

				if (split.length === 2) {
					const partType = split[0].trim();

					let textSearch = variation.replace('{{ assignment }}', partType);
					textSearch = textSearch.replace('{{ duration }}', partTiming);

					const findNextIndex = textSearch.indexOf('{{ source }}');
					const srcNext = src.substring(findNextIndex);
					const findRoundTwo = variation.substring(patternSourceIndex);

					textSearch = findRoundTwo.replace('{{ source }}', '');
					textSearch = textSearch.replace('{{ study }}', '\\d+');
					textSearch = textSearch.replace('(', '(\\(');
					textSearch = textSearch.replace(')', ')\\)');
					textSearch = textSearch.replace(') ', ') ?');
					textSearch = textSearch.replace('??', '?');

					const regex = new RegExp(textSearch.trim());
					const array2 = regex.exec(srcNext);

					const obj = { type: partType, time: partTiming };

					if (array2 === null) {
						obj.src = srcNext;
					}

					if (array2 !== null) {
						obj.study = +array2[1].match(/(\d+)/)[0];
						obj.src = srcNext.substring(0, array2.index).trim();
					}

					let verifyExtract = variation.replace('{{ assignment }}', obj.type);
					verifyExtract = verifyExtract.replace('{{ duration }}', obj.time);
					verifyExtract = verifyExtract.replace('{{ source }}', obj.src);

					if (obj.study) {
						verifyExtract = verifyExtract.replace('{{ study }}', obj.study);
					}

					if (!obj.study) {
						const patternSourceIndex = variation.indexOf(patternSource);
						const endPatternSourceIndex = patternSourceIndex + patternSource.length;

						const srcEndIndex =
							endPatternSourceIndex -
							patternAssignment.length -
							patternDuration.length -
							patternSource.length +
							obj.type.length +
							obj.time.toString().length +
							obj.src.length;

						verifyExtract = src.substring(0, srcEndIndex).trim();
					}

					if (verifyExtract === src) {
						result = obj;
						break;
					}
				}
			}
		}

		if (result) return result;

		throw new JWEPUBParserError(
			'ayf-part',
			`Parsing failed for Apply Yourself to the Field Ministry part. The input was: ${src}`
		);
	} catch (err) {
		throw new JWEPUBParserError(
			'ayf-part',
			`Parsing failed for Apply Yourself to the Field Ministry part. The input was: ${src}`
		);
	}
};

export const extractSourceLiving = (livingPartsVariations, src, lang) => {
	const variations = livingPartsVariations[lang].split('|');
	const patternSource = '{{ source }}';
	const patternDuration = '{{ duration }}';
	const patternContent = '{{ content }}';

	let result;
	for (let i = 0; i < variations.length; i++) {
		const variation = variations[i];

		const patternSourceIndex = variation.indexOf(patternSource);
		const patternContentIndex = variation.indexOf(patternContent);

		let masterSearch = variation.replace(patternSource, '');
		masterSearch = masterSearch.replace(patternContent, '');

		let textSearch = masterSearch.replace('{{ duration }}', '\\d+');
		textSearch = textSearch.replace('(', '(\\(');
		textSearch = textSearch.replace(')', ')\\)');
		textSearch = textSearch.replace(' :', ' ?:?');
		textSearch = textSearch.replace(') ', ') ?');
		textSearch = textSearch.replace('??', '?');

		const regex = new RegExp(textSearch.trim());
		const array = regex.exec(src);

		if (array !== null) {
			const partTiming = +array[0].match(/(\d+)/)[0];
			const findStrings = masterSearch.replace(patternDuration, partTiming);

			let split = src.split(findStrings);

			if (split.length === 1) {
				split = src.split(findStrings.trim());
			}

			if (split.length === 2) {
				let partTitle;
				let partContent;

				if (split[1] === '') {
					partTitle = split[0].trim();
					partContent = '';
				}

				if (split[1] !== '') {
					if (patternSourceIndex < patternContentIndex) {
						partTitle = split[0].trim();
						partContent = split[1].trim();
					}

					if (patternSourceIndex > patternContentIndex) {
						partTitle = split[1].trim();
						partContent = split[0].trim();
					}
				}

				let verifyExtract = variation.replace('{{ source }}', partTitle);
				verifyExtract = verifyExtract.replace('{{ duration }}', partTiming);
				verifyExtract = verifyExtract.replace('{{ content }}', partContent);

				if (split[1] === '') verifyExtract = verifyExtract.trim();

				if (verifyExtract === src) {
					result = {
						time: partTiming,
						title: partTitle,
						content: partContent,
					};
					break;
				}
			}
		}
	}

	if (result) return result;

	throw new JWEPUBParserError('lc-part', `Parsing failed for Living as Christians part. The input was: ${src}`);
};

export const extractSourceCBS = (cbsVariations, src, lang) => {
	const variations = cbsVariations[lang].split('|');

	const pattern = '{{ source }}';

	let result;
	for (let i = 0; i < variations.length; i++) {
		const variation = variations[i];
		const startIndex = variation.indexOf(pattern);
		const endIndex = src.length - variation.replace('{{ source }}', '').length + startIndex;
		const extracted = src.substring(startIndex, endIndex);
		const verifyExtract = variation.replace('{{ source }}', extracted);
		if (verifyExtract === src) {
			result = extracted;
			break;
		}
	}

	if (result) return result;

	throw new JWEPUBParserError('lc-cbs', 'Parsing failed for Congregation Bible Study part');
};
