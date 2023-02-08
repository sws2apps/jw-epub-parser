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

export const extractTitleTGW10 = (tgw10Format, src, lang) => {
	const startDelimiter = tgw10Format[lang].indexOf('<<');
	const endDelimiter = tgw10Format[lang].indexOf('>>');
	const endText = tgw10Format[lang].substring(endDelimiter + 2);
	const findIndex = src.indexOf(endText);

	return src.substring(startDelimiter, findIndex);
};

export const extractSourceTGWBibleReading = (tgwBibleReadingFormat, src, lang) => {
	const variations = tgwBibleReadingFormat[lang].split('|');
	for (let i = 0; i < variations.length; i++) {
		const textTest = variations[i];

		const startDelimiter = textTest.indexOf('<<');
		const endDelimiter = textTest.indexOf('>>');
		const endText = textTest.substring(endDelimiter + 2);

		const value = endText.trim().replace('<n>', '\\d+');
		const regex = new RegExp(value);
		const array = regex.exec(src);

		if (array !== null) {
			const findIndex = array.index - 2;
			const thStudy = +array[0].match(/(\d+)/)[0];
			return { src: src.substring(startDelimiter, findIndex), study: thStudy };
		}
	}
};

export const extractSourceAssignments = (assignmentsFormat, assignmentsName, src, lang) => {
	const variations = assignmentsFormat[lang].split('|');
	for (let a = 0; a < variations.length; a++) {
		const variation = variations[a];
		const startDelimiter = variation.indexOf('<<');
		let startSrc = variation.substring(0, startDelimiter);
		startSrc = startSrc.replace('<n>', '\\d+');
		startSrc = startSrc.replace('(', '\\(');
		startSrc = startSrc.replace(')', '\\)');
		let assignmentsList = '';

		for (let i = 0; i < assignmentsName.length; i++) {
			assignmentsList =
				assignmentsList === '' ? assignmentsName[i][lang] : `${assignmentsList}|${assignmentsName[i][lang]}`;
		}

		startSrc = startSrc.trim().replace('<AssignmentType>', `(${assignmentsList})`);

		let regex = new RegExp(startSrc);
		const array = regex.exec(src);

		if (array !== null) {
			const endIndexType = array[1].length + 1;
			const timingPart = array[0].substring(endIndexType);

			const assignmentTime = +timingPart.match(/(\d+)/)[0];
			const startIndex = array[0].length + 1;

			const obj = {};
			obj.type = array[1];
			obj.time = assignmentTime;

			const endDelimiter = assignmentsFormat[lang].indexOf('>>');
			const endText = assignmentsFormat[lang].substring(endDelimiter + 2);
			const value = endText.trim().replace('<n>', '\\d+');
			regex = new RegExp(value);
			const array2 = regex.exec(src);
			let endIndex = src.length;

			if (array2 !== null) {
				endIndex = array2.index - 2;
				const thStudy = +array2[0].match(/(\d+)/)[0];
				obj.study = thStudy;
			}

			obj.src = src.substring(startIndex, endIndex);

			return obj;
		}
	}
};

export const extractSourceLiving = (livingPartsFormat, src, lang) => {
	const variations = livingPartsFormat[lang].split('|');
	for (let i = 0; i < variations.length; i++) {
		const textTest = variations[i];

		const startDelimiter = textTest.indexOf('>>');
		const endDelimiter = textTest.indexOf('@');
		const timing = textTest.substring(startDelimiter + 2, endDelimiter);
		let value = timing.replace('<n>', '\\d+');
		value = value.replace('(', '(\\(');
		value = value.replace(')', ')\\)');
		value = value.replace(' :', ' ?:?');
		value = value.replace(') ', ') ?');
		value = value.replace('??', '?');
		const regex = new RegExp(value.trim());
		const array = regex.exec(src);

		if (array !== null) {
			const time = +array[0].match(/(\d+)/)[0];

			const split = src.split(array[0]);

			const obj = {};
			obj.time = time;
			obj.title = split[0].trim();
			if (split[1] && split[1].trim() !== '') {
				obj.content = split[1].trim();
			}

			return obj;
		}
	}
};

export const extractSourceCBS = (cbsFormat, src, lang) => {
	const startDelimiter = cbsFormat[lang].indexOf('<<');
	const textDelimiter = src.substring(0, startDelimiter);
	return src.split(textDelimiter)[1];
};

export const extractConcludeSong = (concludingSongFormat, src, lang) => {
	const variations = concludingSongFormat[lang].split('|');
	for (let i = 0; i < variations.length; i++) {
		const textTest = variations[i];
		const endDelimiter = textTest.indexOf('>>');
		const textDelimiter = textTest.substring(endDelimiter + 2);
		const endIndex = src.indexOf(textDelimiter);

		if (endIndex !== -1) {
			return src.substring(0, endIndex).trim();
		}
	}
};
