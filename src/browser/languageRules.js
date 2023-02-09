import source from '../locales/en/text.json';
import F from '../locales/fr-FR/text.json';
import MG from '../locales/mg-MG/text.json';
import T from '../locales/pt-BR/text.json';
import TND from '../locales/mg-TND/text.json';
import TNK from '../locales/mg-TNK/text.json';
import VZ from '../locales/mg-VZ/text.json';

const dataLang = {};

for (const [key] of Object.entries(source)) {
	dataLang[key] = {};
}

for (const [key, value] of Object.entries(source)) {
	dataLang[key].E = value;
}
for (const [key, value] of Object.entries(F)) {
	dataLang[key].F = value;
}
for (const [key, value] of Object.entries(MG)) {
	dataLang[key].MG = value;
}
for (const [key, value] of Object.entries(T)) {
	dataLang[key].T = value;
}
for (const [key, value] of Object.entries(TND)) {
	dataLang[key].TND = value;
}
for (const [key, value] of Object.entries(TNK)) {
	dataLang[key].TNK = value;
}
for (const [key, value] of Object.entries(VZ)) {
	dataLang[key].VZ = value;
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

export const tgw10Format = dataLang.tgwTalk10Format;

export const tgwBibleReadingVariations = dataLang.tgwBibleReadingVariations;

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

export const cbsFormat = dataLang.cbsFormat;

export const concludingSongFormat = dataLang.concludingSongVariations;
