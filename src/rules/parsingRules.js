import {
	assignmentsFormat,
	assignmentsName,
	cbsFormat,
	livingPartsFormat,
	monthNames,
	tgw10Format,
	tgwBibleReadingFormat,
} from './languageRules.js';

export const extractTitleTGW10 = (src, lang) => {
	const startDelimiter = tgw10Format[lang].indexOf('<<');
	const endDelimiter = tgw10Format[lang].indexOf('>>');
	const endText = tgw10Format[lang].substring(endDelimiter + 2);
	const findIndex = src.indexOf(endText);

	return src.substring(startDelimiter, findIndex);
};

export const extractSourceTGWBibleReading = (src, lang) => {
	const startDelimiter = tgwBibleReadingFormat[lang].indexOf('<<');
	const endDelimiter = tgwBibleReadingFormat[lang].indexOf('>>');
	const endText = tgwBibleReadingFormat[lang].substring(endDelimiter + 2);

	const value = endText.trim().replace('<n>', '\\d');
	const regex = new RegExp(value);
	const array = regex.exec(src);
	const findIndex = array.index - 2;
	const thStudy = +array[0].match(/(\d+)/)[0];
	return { src: src.substring(startDelimiter, findIndex), study: thStudy };
};

export const extractSourceAssignments = (src, lang) => {
	const startDelimiter = assignmentsFormat[lang].indexOf('<<');
	let startSrc = assignmentsFormat[lang].substring(0, startDelimiter);
	startSrc = startSrc.replace('<n>', '\\d');
	startSrc = startSrc.replace('(', '\\(');
	startSrc = startSrc.replace(')', '\\)');
	let assignmentsList = '';
	for (let i = 0; i < assignmentsName.length; i++) {
		assignmentsList = assignmentsList === '' ? assignmentsName[i][lang] : `${assignmentsList}|${assignmentsName[i][lang]}`;
	}
	startSrc = startSrc.trim().replace('<AssignmentType>', `(${assignmentsList})`);
	let regex = new RegExp(startSrc);
	let array = regex.exec(src);
	const assignmentTime = +array[0].match(/(\d+)/)[0];
	const startIndex = array[0].length + 1;

	const obj = {};
	obj.type = array[1];
	obj.time = assignmentTime;

	const endDelimiter = assignmentsFormat[lang].indexOf('>>');
	const endText = assignmentsFormat[lang].substring(endDelimiter + 2);
	const value = endText.trim().replace('<n>', '\\d');
	regex = new RegExp(value);
	array = regex.exec(src);
	let endIndex = src.length;

	if (array !== null) {
		endIndex = array.index - 2;
		const thStudy = +array[0].match(/(\d+)/)[0];
		obj.study = thStudy;
	}

	obj.src = src.substring(startIndex, endIndex);

	return obj;
};

export const extractSourceLiving = (src, lang) => {
	let srcReg = livingPartsFormat[lang];
	const startDelimiter = livingPartsFormat[lang].indexOf('>>');
	const endDelimiter = livingPartsFormat[lang].indexOf('@');
	const timing = livingPartsFormat[lang].substring(startDelimiter + 2, endDelimiter);
	let value = timing.replace('<n>', '\\d+');
	value = value.replace('(', '(\\(');
	value = value.replace(')', ')\\)');
	value = value.replace(' :', ' ?:?');
	value = value.replace(') ', ') ?');
	value = value.replace('??', '?');
	const regex = new RegExp(value.trim());
	const array = regex.exec(src);

	const time = +array[0].match(/(\d+)/)[0];

	const split = src.split(array[0]);

	const obj = {};
	obj.time = time;
	obj.title = split[0].trim();
	if (split[1] && split[1].trim() !== '') {
		obj.content = split[1].trim();
	}

	return obj;
};

export const extractSourceCBS = (src, lang) => {
	const startDelimiter = cbsFormat[lang].indexOf('<<');
	const textDelimiter = src.substring(0, startDelimiter);
	return src.split(textDelimiter)[1];
};
