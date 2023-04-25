import dateFormat from 'dateformat';
import languages from './locales/languages.js';
import {
	extractMonthName,
	extractSourceAssignments,
	extractSourceCBS,
	extractSourceLiving,
	extractSourceTGWBibleReading,
	extractTitleTGW10,
} from './rules/parsingRules.js';

export const isValidEpubNaming = (name) => {
	let regex = /^mwb_[A-Z][A-Z]?[A-Z]?_202\d(0[1-9]|1[0-2])\.epub$/i;
	return regex.test(name);
};

export const isValidFilename = (name) => {
	let valid = false;

	if (name.startsWith('OEBPS') && name.endsWith('.xhtml')) {
		const fileName = name.split('/')[1].split('.')[0];
		if (!isNaN(fileName)) {
			valid = true;
		}
	}

	return valid;
};

export const getHtmlRawString = async (zip, filename) => {
	const content = await zip.file(filename).async('string');

	return content;
};

export const isValidMwbSched = (htmlDoc) => {
	const isValidTGW = htmlDoc.querySelector(`[class*=treasures]`) ? true : false;
	const isValidAYF = htmlDoc.querySelector(`[class*=ministry]`) ? true : false;
	const isValidLC = htmlDoc.querySelector(`[class*=christianLiving]`) ? true : false;

	let valid = false;
	if (isValidTGW === true && isValidAYF === true && isValidLC === true) {
		return true;
	}

	return valid;
};

export const parseEpub = (htmlDocs, mwbYear, lang, fromHTML, rules) => {
	const obj = {};
	const weeksData = [];
	let weeksCount;

	const isEnhancedParsing = languages.find((language) => language.code === lang);

	weeksCount = htmlDocs.length;

	obj.weeksCount = weeksCount;
	obj.mwbYear = mwbYear;

	for (let a = 0; a < weeksCount; a++) {
		const weekItem = {};

		const htmlItem = htmlDocs[a];

		// get week date
		const wdHtml = fromHTML
			? htmlItem.querySelector('article').querySelector('header').querySelector('h1')
			: htmlItem.getElementsByTagName('h1').item(0);
		const weekDate = wdHtml.textContent.replaceAll(/\u00A0/g, ' ');

		if (isEnhancedParsing) {
			const { varDay, monthIndex } = extractMonthName(rules.monthNames, weekDate, lang);
			const schedDate = new Date(mwbYear, monthIndex, varDay);
			weekItem.weekDate = dateFormat(schedDate, 'mm/dd/yyyy');
			weekItem.weekDateLocale = weekDate;
		} else {
			weekItem.weekDate = weekDate;
		}

		// get weekly Bible Reading
		const wbHtml = fromHTML
			? htmlItem.querySelector('article').querySelector('header').querySelector('h2')
			: htmlItem.getElementsByTagName('h2').item(0);
		weekItem.weeklyBibleReading = wbHtml.textContent.replaceAll(/\u00A0/g, ' ');

		let src = '';
		let cnLC = 0;

		// get number of assignments in Apply Yourself Parts
		const cnAYF = htmlItem.querySelector('#section3').querySelectorAll('li').length;

		// get number of assignments in Living as Christians Parts
		const lcLiLength = htmlItem.querySelector('#section4').querySelectorAll('li').length;
		cnLC = lcLiLength === 6 ? 2 : 1;

		// get elements with meeting schedule data: pGroup
		const pGroupData = htmlItem.querySelectorAll('.pGroup');
		pGroupData.forEach((pGroup) => {
			const liData = pGroup.querySelectorAll('li');
			liData.forEach((li) => {
				const firstP = li.querySelector('p');
				src += '|' + firstP.textContent;
			});
		});

		src = src.replaceAll(/\u00A0/g, ' '); // remove non-breaking space
		let toSplit = src.split('|');

		// First song
		weekItem.songFirst = +toSplit[1].match(/(\d+)/)[0];

		// 10min TGW Source
		if (isEnhancedParsing) {
			weekItem.tgw10Talk = extractTitleTGW10(rules.tgw10Variations, toSplit[3].trim(), lang);
		} else {
			weekItem.tgw10Talk = toSplit[3].trim();
		}

		//Bible Reading Source
		if (isEnhancedParsing) {
			const dataTGWBRead = extractSourceTGWBibleReading(rules.tgwBibleReadingVariations, toSplit[7].trim(), lang);
			weekItem.tgwBRead = dataTGWBRead.src;
			weekItem.tgwBReadStudy = dataTGWBRead.study;
		} else {
			weekItem.tgwBRead = toSplit[7].trim();
		}

		// AYF Part Count
		weekItem.ayfCount = cnAYF;

		//AYF1 Source
		if (isEnhancedParsing) {
			const dataAssignment = extractSourceAssignments(
				rules.assignmentsVariations,
				rules.assignmentsName,
				toSplit[8].trim(),
				lang
			);
			weekItem.ayfPart1 = dataAssignment.src;
			weekItem.ayfPart1Time = dataAssignment.time;
			weekItem.ayfPart1Type = dataAssignment.type;
			if (dataAssignment.study) {
				weekItem.ayfPart1Study = dataAssignment.study;
			}
		} else {
			weekItem.ayfPart1 = toSplit[8].trim();
		}

		if (cnAYF > 1) {
			//AYF2 Source
			if (isEnhancedParsing) {
				const dataAssignment = extractSourceAssignments(
					rules.assignmentsVariations,
					rules.assignmentsName,
					toSplit[9].trim(),
					lang
				);
				weekItem.ayfPart2 = dataAssignment.src;
				weekItem.ayfPart2Time = dataAssignment.time;
				weekItem.ayfPart2Type = dataAssignment.type;
				if (dataAssignment.study) {
					weekItem.ayfPart2Study = dataAssignment.study;
				}
			} else {
				weekItem.ayfPart2 = toSplit[9].trim();
			}
		}

		if (cnAYF > 2) {
			//AYF3 Source
			if (isEnhancedParsing) {
				const dataAssignment = extractSourceAssignments(
					rules.assignmentsVariations,
					rules.assignmentsName,
					toSplit[10].trim(),
					lang
				);
				weekItem.ayfPart3 = dataAssignment.src;
				weekItem.ayfPart3Time = dataAssignment.time;
				weekItem.ayfPart3Type = dataAssignment.type;
				if (dataAssignment.study) {
					weekItem.ayfPart3Study = dataAssignment.study;
				}
			} else {
				weekItem.ayfPart3 = toSplit[10].trim();
			}
		}

		if (cnAYF > 3) {
			//AYF4 Source
			if (isEnhancedParsing) {
				const dataAssignment = extractSourceAssignments(
					rules.assignmentsVariations,
					rules.assignmentsName,
					toSplit[11].trim(),
					lang
				);
				weekItem.ayfPart4 = dataAssignment.src;
				weekItem.ayfPart4Time = dataAssignment.time;
				weekItem.ayfPart4Type = dataAssignment.type;
				if (dataAssignment.study) {
					weekItem.ayfPart4Study = dataAssignment.study;
				}
			} else {
				weekItem.ayfPart4 = toSplit[11].trim();
			}
		}

		// Middle song
		let nextIndex = cnAYF > 3 ? 12 : cnAYF > 2 ? 11 : cnAYF > 1 ? 10 : 9;
		weekItem.songMiddle = +toSplit[nextIndex].match(/(\d+)/)[0];

		// LC Part Count
		weekItem.lcCount = cnLC;

		// 1st LC part
		nextIndex++;

		if (isEnhancedParsing) {
			const dataLC = extractSourceLiving(rules.livingPartsVariations, toSplit[nextIndex].trim(), lang);
			weekItem.lcPart1 = dataLC.title;
			weekItem.lcPart1Time = dataLC.time;
			if (dataLC.content && dataLC.content !== '') {
				weekItem.lcPart1Content = dataLC.content;
			}
		} else {
			weekItem.lcPart1 = toSplit[nextIndex].trim();
		}

		if (cnLC === 2) {
			// 2nd LC part
			nextIndex++;

			if (isEnhancedParsing) {
				const dataLC = extractSourceLiving(rules.livingPartsVariations, toSplit[nextIndex].trim(), lang);
				weekItem.lcPart2 = dataLC.title;
				weekItem.lcPart2Time = dataLC.time;
				if (dataLC.content && dataLC.content !== '') {
					weekItem.lcPart2Content = dataLC.content;
				}
			} else {
				weekItem.lcPart2 = toSplit[nextIndex].trim();
			}
		}

		// CBS Source
		nextIndex++;

		if (isEnhancedParsing) {
			weekItem.lcCBS = extractSourceCBS(rules.cbsVariations, toSplit[nextIndex].trim(), lang);
		} else {
			weekItem.lcCBS = toSplit[nextIndex].trim();
		}
		// Concluding Song
		nextIndex++;
		nextIndex++;

		const songText = toSplit[nextIndex];
		const temp = +songText.match(/(\d+)/)[0];
		weekItem.songConclude = temp > 151 ? songText : temp;

		weeksData.push(weekItem);
	}

	obj.weeksData = weeksData;

	return obj;
};
