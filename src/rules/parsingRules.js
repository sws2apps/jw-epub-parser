// add your language code and the month name
export const monthNames = [
	{ index: 0, names: { E: 'January', F: 'janvier', MG: 'Janoary' } },
	{ index: 1, names: { E: 'February', F: 'février', MG: 'Febroary' } },
	{ index: 2, names: { E: 'March', F: 'mars', MG: 'Martsa' } },
	{ index: 3, names: { E: 'April', F: 'avril', MG: 'Aprily' } },
	{ index: 4, names: { E: 'May', F: 'mai', MG: 'Mey' } },
	{ index: 5, names: { E: 'June', F: 'juin', MG: 'Jona' } },
	{ index: 6, names: { E: 'July', F: 'juillet', MG: 'Jolay' } },
	{ index: 7, names: { E: 'August', F: 'août', MG: 'Aogositra' } },
	{ index: 8, names: { E: 'September', F: 'septembre', MG: 'Septambra' } },
	{ index: 9, names: { E: 'October', F: 'octobre', MG: 'Oktobra' } },
	{ index: 10, names: { E: 'November', F: 'novembre', MG: 'Novambra' } },
	{ index: 11, names: { E: 'December', F: 'decembre', MG: 'Desambra' } },
];

// parsing rule for 10min talk in Treasures
const tgw10Format = { E: '<<Title>>: (10 min.)', F: '<<Title>> (10 min)', MG: '<<Title>>: (10 min.)' };
export const extractTitleTGW10 = (src, lang) => {
	const startDelimiter = tgw10Format[lang].indexOf('<<');
	const endDelimiter = tgw10Format[lang].indexOf('>>');
	const endText = tgw10Format[lang].substring(endDelimiter + 2);
	const findIndex = src.indexOf(endText);

	return src.substring(startDelimiter, findIndex);
};

const tgwBibleReadingFormat = {
	E: 'Bible Reading: (4 min.) <<Title>> (th study <n>)',
	F: 'Lecture de la Bible (4 min) : <<Title>> (th leçon <n>)',
	MG: 'Famakiana Baiboly: (4 min.) <<Title>> (th lesona <n>)',
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

const assignmentsName = [
	{ E: 'Initial Call Video', F: 'Vidéo du premier contact', MG: 'Video Fitoriana' },
	{ E: 'Return Visit Video', F: 'Vidéo de la nouvelle visite', MG: 'Video Fiverenana Mitsidika' },
	{ E: 'Memorial Invitation Video', F: 'Vidéo d’invitation au Mémorial', MG: 'Video Fanasana Fahatsiarovana' },
	{ E: 'Initial Call', F: 'Premier contact', MG: 'Fitoriana' },
	{ E: 'Return Visit', F: 'Nouvelle visite', MG: 'Fiverenena Mitsidika' },
	{ E: 'Bible Study ', F: 'Cours biblique', MG: 'Fampianarana Baiboly' },
	{ E: 'Talk ', F: 'Discours', MG: 'Lahateny' },
	{ E: 'Memorial Invitation', F: 'Invitation au Mémorial', MG: 'Fanasana Fahatsiarovana' },
];

const assignmentsFormat = {
	E: '<AssignmentType>: (<n> min.) <<Title>> (th study <n>)',
	F: '<AssignmentType> (<n> min) : <<Title>> (th leçon <n>)',
	MG: '<AssignmentType>: (<n> min.) <<Title>> (th lesona <n>)',
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
	startSrc = startSrc.replace('<AssignmentType>', `(${assignmentsList})`);
	let regex = new RegExp(startSrc);
	let array = regex.exec(src);
	const assignmentTime = +array[0].match(/(\d+)/)[0];
	const startIndex = array[0].length;

	const obj = {};
	obj.type = array[1];
	obj.time = assignmentTime;

	const endDelimiter = assignmentsFormat[lang].indexOf('>>');
	const endText = assignmentsFormat[lang].substring(endDelimiter + 2);
	const value = endText.trim().replace('<n>', '\\d');
	regex = new RegExp(value);
	array = regex.exec(src);

	console.log(array);
};
