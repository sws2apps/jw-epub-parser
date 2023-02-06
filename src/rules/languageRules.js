import languages from '../locales/languages.js';

const isJsDom =
	(typeof window !== 'undefined' && window.name === 'nodejs') ||
	(typeof navigator !== 'undefined' &&
		(navigator.userAgent.includes('Node.js') || navigator.userAgent.includes('jsdom')));

const dataLang = {};

// set key from source
let source;

if (!isJsDom) {
	source = await import('../locales/en/text.json');
}

if (isJsDom) {
	source = await import('../locales/en/text.json', {
		assert: { type: 'json' },
	});
}

for (const [key] of Object.entries(source.default)) {
	dataLang[key] = {};
}

// load all language data
for await (const language of languages) {
	let translation;

	if (!isJsDom) {
		translation = await import(`../locales/${language.locale}/text.json`);
	}

	if (isJsDom) {
		translation = await import(`../locales/${language.locale}/text.json`, {
			assert: { type: 'json' },
		});
	}

	for (const [key, value] of Object.entries(translation.default)) {
		dataLang[key][language.code] = value;
	}
}

export const monthNames = [
	{ index: 0, names: dataLang.januaryVariations },
	{ index: 1, names: dataLang.februaryVariations },
	{ index: 2, names: dataLang.marchVariations },
	{ index: 3, names: dataLang.aprilVariations },
	{ index: 4, names: dataLang.mayVariations },
	{ index: 5, names: dataLang.juneVariations },
	{ index: 6, names: dataLang.julyVariations },
	{ index: 7, names: dataLang.augustVariations },
	{ index: 8, names: dataLang.septemberVariations },
	{ index: 9, names: dataLang.octoberVariations },
	{ index: 10, names: dataLang.novemberVariations },
	{ index: 11, names: dataLang.decemberVariations },
];

export const tgw10Format = dataLang.tgwTalk10Variations;

export const tgwBibleReadingFormat = dataLang.tgwBibleReadingVariations;

export const assignmentsName = [
	dataLang.initialCallVideoVariations,
	dataLang.returnVisitVideoVariations,
	dataLang.memorialInvitationVideoVariations,
	dataLang.initialCallVariations,
	dataLang.returnVisitVariations,
	dataLang.bibleStudyVariations,
	dataLang.talkVariations,
	dataLang.memorialInvitationVariations,
];

export const assignmentsFormat = dataLang.assignmentAyfVariations;

export const livingPartsFormat = dataLang.assignmentLcVariations;

export const cbsFormat = dataLang.cbsVariations;

export const concludingSongFormat = dataLang.concludingSongVariations;

// since we cannot control source materials for languages
// we provide overrides settings in case a mistake is found in published EPUB Meeting Workbook
export const assignmentsOverride = {
	VZ: [{ correct: 'Fitoria', override: 'Fianara' }],
};
