import { JWEPUBParserError } from '../classes/error.js';
import {
  WDateParsing,
  WDateParsingResult,
  LangRegExp,
  MWBDateParsingResult,
  MWBDateParsing,
} from '../types/index.js';
import { getMonthNames } from './language_rules.js';

const dateRangeSeparator = `\\s? bis |[-–—]| do | — | – \\s?`;
const wordWithDiacritics = `\\p{L}+|\\p{L}+\\p{M}*`;
let option1: string, option2: string, option3: string;

// #region MEETING WORKBOOK

// #region date patterns: add your language regular expression date pattern if it is different than common

// date like 1) 23-29 décembre; or 2) 25 novembre–1 décembre; or 3) 30 décembre 2024-5 janvier 2025
option1 = `(\\d{1,2})(?:er|º)?(?:${dateRangeSeparator})(?:\\d{1,2}) (${wordWithDiacritics})`;
option2 = `(\\d{1,2})(?:er|º)? (${wordWithDiacritics})(?:${dateRangeSeparator})(?:\\d{1,2})(?:er|º)?(?: )?(?:${wordWithDiacritics})`;
option3 = `(\\d{1,2}) (${wordWithDiacritics}) (\\d{4})`;
const mwbDatePatternCommon = `${option1}|${option2}|${option3}`;

// date like 1) DECEMBER 23-29; or 2) NOVEMBER 25–DECEMBER 1; or 3) DECEMBER 30, 2024-JANUARY 5,2025
option1 = `(${wordWithDiacritics}) (\\d{1,2})[-–](?:\\d{1,2})`;
option2 = `(${wordWithDiacritics}) (\\d{1,2})[-–](?:${wordWithDiacritics}) (?:\\d{1,2})`;
option3 = `(${wordWithDiacritics}) (\\d{1,2}), (\\d{4})`;
const mwbDatePatternE = `${option1}|${option2}|${option3}`;

// date like 1-) 12月23-29日; or 2) 11月25日-12月1日; or 3) 2024年12月30日-2025年1月5日
option1 = `(\\d{1,2})月(\\d{1,2})[-–](?:\\d{1,2})日`;
option2 = `(\\d{1,2})月(\\d{1,2})日`;
option3 = `(?:\\d{4})年(\\d{1,2})月(\\d{1,2})日`;
const mwbDatePatternJ = `${option1}|${option2}|${option3}`;

// date like 1-) 4-10 listopada; or 2) 25 listopada do 1 grudnia; or 3) 30 grudnia 2024 do 5 stycznia 2025
option1 = `(\\d{1,2})[-–](?:\\d{1,2}) (${wordWithDiacritics})`;
option2 = `(\\d{1,2}) (${wordWithDiacritics}) do (?:\\d{1,2}) (?:${wordWithDiacritics})`;
option3 = `(\\d{1,2}) (${wordWithDiacritics}) (\\d{4})`;
const mwbDatePatternP = `${option1}|${option2}|${option3}`;

// date like 1-) 4-10 de noviembre; or 2) 25 de noviembre a 1 de diciembre; or 3) 30 de diciembre de 2024 a 5 de enero de 2025
option1 = `(\\d{1,2})[-–](?:\\d{1,2}) de (${wordWithDiacritics})`;
option2 = `(\\d{1,2}) de (${wordWithDiacritics}) a (?:\\d{1,2}) de (?:${wordWithDiacritics})`;
option3 = `(\\d{1,2}) de (${wordWithDiacritics}) de (\\d{4})`;
const mwbDatePatternS = `${option1}|${option2}|${option3}`;

// date like 1-) 4-10 de novembro; or 2) 25 de novembro–1.º de dezembro; or 3) 30 de dezembro de 2024–5 de janeiro de 2025
option1 = `(\\d{1,2})[-–](?:\\d{1,2}) de (${wordWithDiacritics})`;
option2 = `(\\d{1,2}) de (${wordWithDiacritics})[-–](?:\\d{1,2})(?:.º)? de (?:${wordWithDiacritics})`;
option3 = `(\\d{1,2}) de (${wordWithDiacritics}) de (\\d{4})`;
const mwbDatePatternT = `${option1}|${option2}|${option3}`;

// date like 1-) 4-10 de noviembre; or 2) 25 de noviembre a 1 de diciembre; or 3) 30 de diciembre de 2024 a 5 de enero de 2025
option1 = `(\\d{1,2}) a (?:\\d{1,2}) de (${wordWithDiacritics})`;
option2 = `(\\d{1,2}) de (${wordWithDiacritics}) a (?:\\d{1,2}) de (?:${wordWithDiacritics})`;
option3 = `(\\d{1,2}) de (${wordWithDiacritics}) de (\\d{4})`;
const mwbDatePatternTPO = `${option1}|${option2}|${option3}`;

// date like 1-) 4-10 de noviembre; or 2) 25 de noviembre a 1 de diciembre; or 3) 30 de diciembre de 2024 a 5 de enero de 2025
option1 = `(\\d{1,2}).[-–](?:\\d{1,2}). (${wordWithDiacritics})`;
option2 = `(\\d{1,2}). (${wordWithDiacritics}) [-–] (?:\\d{1,2}). (?:${wordWithDiacritics})`;
option3 = `(\\d{1,2}). (${wordWithDiacritics}) (\\d{4})`;
const mwbDatePatternX = `${option1}|${option2}|${option3}`;

const mwbDatePatterns: LangRegExp = {
  common: new RegExp(mwbDatePatternCommon, 'giu'),
  CH: new RegExp(mwbDatePatternJ, 'giu'),
  CHS: new RegExp(mwbDatePatternJ, 'giu'),
  E: new RegExp(mwbDatePatternE, 'giu'),
  J: new RegExp(mwbDatePatternJ, 'giu'),
  P: new RegExp(mwbDatePatternP, 'giu'),
  S: new RegExp(mwbDatePatternS, 'giu'),
  T: new RegExp(mwbDatePatternT, 'giu'),
  TG: new RegExp(mwbDatePatternE, 'giu'),
  TPO: new RegExp(mwbDatePatternTPO, 'giu'),
  TW: new RegExp(mwbDatePatternE, 'giu'),
  X: new RegExp(mwbDatePatternX, 'giu'),
};

// #endregion

// #region date parsing: add your language regular expression pattern if it is different than common, or use existing function if it matches your language
const mwbParsingCommon = (groups: string[]): MWBDateParsingResult => {
  let date: string, month: string;

  if (groups[1]) {
    date = groups[1];
    month = groups[2];
  } else if (groups[3]) {
    date = groups[3];
    month = groups[4];
  } else {
    date = groups[5];
    month = groups[6];
  }

  return [month, date];
};

const mwbParsingE = (groups: string[]): MWBDateParsingResult => {
  let date: string, month: string;

  if (groups[1]) {
    month = groups[1];
    date = groups[2];
  } else if (groups[3]) {
    month = groups[3];
    date = groups[4];
  } else {
    month = groups[5];
    date = groups[6];
  }

  return [month, date];
};

const mwbDateParsing: MWBDateParsing = {
  common: mwbParsingCommon,
  CH: mwbParsingE,
  CHS: mwbParsingE,
  E: mwbParsingE,
  J: mwbParsingE,
  TG: mwbParsingE,
  TW: mwbParsingE,
};

// #endregion

export const extractMWBDate = (src: string, year: number, lang: string) => {
  const srcClean = src
    .trim()
    .replace('  ', ' ')
    .replace('​', '')
    .replace('⁠', '')
    .replace(/\u200F/g, '');

  const datePattern = mwbDatePatterns[lang] || mwbDatePatterns.common;

  const match = srcClean.match(datePattern);

  if (!match) {
    throw new JWEPUBParserError('mwb', `Parsing failed for Meeting Workbook Date. The input was: ${src}`);
  }

  const groups = Array.from(datePattern.exec(srcClean)!);

  const parseDataFunc = mwbDateParsing[lang] || mwbDateParsing.common;

  let [month, date] = parseDataFunc(groups);

  if (isNaN(+month)) {
    const months = getMonthNames(lang);
    const monthIndex = months.find((record) => record.name.toLocaleLowerCase().includes(month.toLowerCase()))!.index;

    month = String(monthIndex + 1);
  }

  const result = `${year}/${String(month).padStart(2, '0')}/${String(date).padStart(2, '0')}`;

  return result;
};

// #endregion

// #region WATCHTOWER STUDY

// #region date patterns: add your language regular expression date pattern if it is different than common

// date like 1-) 16-22 December 2024; or 2) 30 December 2024-5 January 2024
option1 = `(\\d{1,2})(?:${dateRangeSeparator})(?:\\d{1,2})? (${wordWithDiacritics})(?:,)? (\\d{4})`;
option2 = `(\\d{1,2}) (${wordWithDiacritics})(?:,)? (\\d{4})`;
const wDatePatternCommon = `${option1}|${option2}`;

// date like 1-) December 16-22, 2024; or 2) December 30, 2024-January 5, 2024
option1 = `(${wordWithDiacritics}) (\\d{1,2})[-–](?:\\d{1,2})?, (\\d{4})`;
option2 = `(${wordWithDiacritics}) (\\d{1,2}), (\\d{4})`;
const wDatePatternE = `${option1}|${option2}`;

// date like 1-) 2024年12月16-22日; or 2) 2024年12月30日-2025年1月5日
option1 = `(\\d{4})年(\\d{1,2})月(\\d{1,2})[-–](\\d{1,2})日`;
option2 = `(\\d{4})年(\\d{1,2})月(\\d{1,2})日`;
const wDatePatternJ = `${option1}|${option2}`;

// date like 1-) Artykuł do studium w tygodniu od 14 do 20 października 2024 roku; or 2) Artykuł do studium w tygodniu od 28 października do 3 listopada 2024 roku; or 3) Artykuł do studium w tygodniu od 30 grudnia 2024 roku do 5 stycznia 2025 roku.
option1 = `(\\d{1,2}) do (?:\\d{1,2})? (${wordWithDiacritics}) (\\d{4})`;
option2 = `(\\d{1,2}) (${wordWithDiacritics}) do (?:\\d{1,2}) (?:${wordWithDiacritics}) (\\d{4})`;
option3 = `(\\d{1,2}) (${wordWithDiacritics}) (\\d{4})`;
const wDatePatternP = `${option1}|${option2}|${option3}`;

// date like 1-) 16 al 22 de december de 2024; or 2) 30 de december de 2024 al 5 de january de 2025
option1 = `(\\d{1,2}) al (?:\\d{1,2})? de (${wordWithDiacritics}) de (\\d{4})`;
option2 = `(\\d{1,2}) de (${wordWithDiacritics}) de (\\d{4})`;
const wDatePatternS = `${option1}|${option2}`;

// date like 1-) 16-22 de december de 2024; or 2) Estudo para a semana de 28 de outubro-3 de novembro de 2024; or 3) 30 de december de 2024-5 de january de 2025
option1 = `(\\d{1,2})[-](?:\\d{1,2})? de (${wordWithDiacritics}) de (\\d{4})`;
option2 = `(\\d{1,2}) de (${wordWithDiacritics})[-](?:\\d{1,2})? de (?:${wordWithDiacritics}) de (\\d{4})`;
option3 = `(\\d{1,2}) de (${wordWithDiacritics}) de (\\d{4})`;
const wDatePatternT = `${option1}|${option2}|${option3}`;

// date like 1-) 16 a 22 de december de 2024; or 2) 30 de december de 2024 a 5 de january de 2025
option1 = `(\\d{1,2}) a (?:\\d{1,2})? de (${wordWithDiacritics}) de (\\d{4})`;
option2 = `(\\d{1,2}) de (${wordWithDiacritics}) de (\\d{4})`;
const wDatePatternTPO = `${option1}|${option2}`;

// date like 1-) Hianarana ny herinandron’ny 9 ka hatramin’ny 15 Desambra 2024.; or 2) Hianarana ny herinandron’ny 30 Desambra 2024 ka hatramin’ny 5 Janoary 2025
option1 = `(\\d{1,2}) ka hatramin’ny (?:\\d{1,2})? (${wordWithDiacritics}) (\\d{4})`;
option2 = `(\\d{1,2}) (${wordWithDiacritics}) ka hatramin’ny (?:\\d{1,2}) (?:${wordWithDiacritics}) (\\d{4})`;
option3 = `(\\d{1,2}) (${wordWithDiacritics}) (\\d{4})`;
const wDatePatternTTM = `${option1}|${option2}|${option3}`;

// date like 1-) Yebesua no October 21-27, 2024.; or 2) Yebesua no October 28–​November 3, 2024 ; or 3) Yebesua no December 30, 2024–​January 5, 2025
option1 = `(${wordWithDiacritics}) (\\d{1,2})[-–](?:\\d{1,2})?, (\\d{4})`;
option2 = `(${wordWithDiacritics}) (\\d{1,2})[-–](?:${wordWithDiacritics}) (?:\\d{1,2}), (\\d{4})`;
option3 = `(${wordWithDiacritics}) (\\d{1,2}), (\\d{4})`;
const wDatePatternTW = `${option1}|${option2}|${option3}`;

// date like 1-) 40. Studienartikel: 9. bis 15. Dezember 2024; or 2) 43. Studienartikel: 30. Dezember 2024 bis 5. Januar 2025
option1 = `(\\d{1,2}). bis (?:\\d{1,2}).? (${wordWithDiacritics}) (\\d{4})`;
option2 = `(\\d{1,2}). (${wordWithDiacritics}) (\\d{4})`;
const wDatePatternX = `${option1}|${option2}`;

const wDatePatterns: LangRegExp = {
  common: new RegExp(wDatePatternCommon, 'giu'),
  CH: new RegExp(wDatePatternJ, 'giu'),
  CHS: new RegExp(wDatePatternJ, 'giu'),
  E: new RegExp(wDatePatternE, 'giu'),
  J: new RegExp(wDatePatternJ, 'giu'),
  P: new RegExp(wDatePatternP, 'giu'),
  S: new RegExp(wDatePatternS, 'giu'),
  T: new RegExp(wDatePatternT, 'giu'),
  TPO: new RegExp(wDatePatternTPO, 'giu'),
  TG: new RegExp(wDatePatternE, 'giu'),
  TTM: new RegExp(wDatePatternTTM, 'giu'),
  TW: new RegExp(wDatePatternTW, 'giu'),
  X: new RegExp(wDatePatternX, 'giu'),
};

// #endregion

// #region date parsing: add your language regular expression pattern if it is different than common, or use existing function if it matches your language
const wParsingCommon = (groups: string[]): WDateParsingResult => {
  let date: string, month: string, year: string;

  if (groups[1]) {
    date = groups[1];
    month = groups[2];
    year = groups[3];
  } else {
    date = groups[4];
    month = groups[5];
    year = groups[6];
  }

  return [year, month, date];
};

const wParsingE = (groups: string[]): WDateParsingResult => {
  let date: string, month: string, year: string;

  if (groups[1]) {
    month = groups[1];
    date = groups[2];
    year = groups[3];
  } else {
    month = groups[4];
    date = groups[5];
    year = groups[6];
  }

  return [year, month, date];
};

const wParsingJ = (groups: string[]): WDateParsingResult => {
  let date: string, month: string, year: string;

  if (groups[1]) {
    year = groups[1];
    month = groups[2];
    date = groups[3];
  } else {
    year = groups[5];
    month = groups[6];
    date = groups[7];
  }

  return [year, month, date];
};

const wParsingP = (groups: string[]): WDateParsingResult => {
  let date: string, month: string, year: string;

  if (groups[1]) {
    date = groups[1];
    month = groups[2];
    year = groups[3];
  } else if (groups[4]) {
    date = groups[4];
    month = groups[5];
    year = groups[6];
  } else {
    month = groups[7];
    date = groups[8];
    year = groups[9];
  }

  return [year, month, date];
};

const wParsingTW = (groups: string[]): WDateParsingResult => {
  let date: string, month: string, year: string;

  if (groups[1]) {
    month = groups[1];
    date = groups[2];
    year = groups[3];
  } else if (groups[4]) {
    month = groups[4];
    date = groups[5];
    year = groups[6];
  } else {
    month = groups[7];
    date = groups[8];
    year = groups[9];
  }

  return [year, month, date];
};

const wDateParsing: WDateParsing = {
  common: wParsingCommon,
  CH: wParsingJ,
  CHS: wParsingJ,
  E: wParsingE,
  J: wParsingJ,
  P: wParsingP,
  T: wParsingP,
  TG: wParsingE,
  TTM: wParsingP,
  TW: wParsingTW,
};

// #endregion

export const extractWTStudyDate = (src: string, lang: string) => {
  const srcClean = src
    .trim()
    .replace('  ', ' ')
    .replace('​', '')
    .replace('⁠', '')
    .replace(/\u200F/g, '');

  const datePattern = wDatePatterns[lang] || wDatePatterns.common;

  const match = srcClean.match(datePattern);

  if (!match) {
    throw new JWEPUBParserError('wtstudy', `Parsing failed for Watchtower Study Date. The input was: ${src}`);
  }

  const groups = Array.from(datePattern.exec(srcClean)!);

  const parseDataFunc = wDateParsing[lang] || wDateParsing.common;

  let [year, month, date] = parseDataFunc(groups);

  if (isNaN(+month)) {
    const months = getMonthNames(lang);
    const monthIndex = months.find((record) => record.name.toLocaleLowerCase().includes(month.toLowerCase()))!.index;

    month = String(monthIndex + 1);
  }

  const result = `${year}/${String(month).padStart(2, '0')}/${String(date).padStart(2, '0')}`;

  return result;
};

// #endregion
