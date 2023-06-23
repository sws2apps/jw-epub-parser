import { JWEPUBParserError } from '../classes/error.js';
import {
  getAssignmentsName,
  getAssignmentsVariations,
  getCBSVariations,
  getLivingPartsVariations,
  getMonthNames,
  getStudyArticleDateVariations,
  getTGWBibleReadingVariations,
  getTGWTalkVariations,
} from './language_rules.js';

export const extractMonthName = (src, lang) => {
  let varDay;
  let monthIndex;

  src = src.split('–')[0];

  const monthNames = getMonthNames(lang);

  for (const month of monthNames) {
    const monthLang = month.name;
    const regex = new RegExp(`(${monthLang})`);
    const array = regex.exec(src);

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

export const extractTGWTalk = (src, lang) => {
  const variations = getTGWTalkVariations(lang).split('|');
  const pattern = '{{ title }}';

  let result;
  for (const variation of variations) {
    const startIndex = variation.indexOf(pattern);
    const endIndex = src.length - variation.replace(pattern, '').length + startIndex;
    const extracted = src.substring(startIndex, endIndex);
    const verifyExtract = variation.replace(pattern, extracted);
    if (verifyExtract === src) {
      result = extracted;
      break;
    }
  }

  if (result) return result;

  throw new JWEPUBParserError('tgw-talk', `Parsing failed for Treasures from God’s Word part. The input was: ${src}`);
};

export const extractTGWBibleReading = (src, lang) => {
  const variations = getTGWBibleReadingVariations(lang).split('|');
  const pattern = '{{ source }}';

  let result;
  for (const variation of variations) {
    const startIndex = variation.indexOf(pattern);
    const endIndex = src.length - variation.replace(pattern, '').length + startIndex;
    const extracted = src.substring(startIndex, endIndex);
    const verifyExtract = variation.replace(pattern, extracted);
    if (verifyExtract === src) {
      result = extracted;
      break;
    }
  }

  if (result) return result;

  throw new JWEPUBParserError('tgw-bibleReading', 'Parsing failed for Bible Reading part');
};

export const extractAYFAssignment = (src, lang) => {
  const variations = getAssignmentsVariations(lang).split('|');
  const assignmentsName = getAssignmentsName(lang);

  const patternAssignment = '{{ assignment }}';
  const patternSource = '{{ source }}';

  let result;
  for (const variation of variations) {
    const patternSourceIndex = variation.indexOf(patternSource);

    const find = variation.substring(0, patternSourceIndex).trim();

    let assignmentsList = '(';
    for (let a = 0; a < assignmentsName.length; a++) {
      assignmentsList += assignmentsName[a];

      if (a < assignmentsName.length - 1) {
        assignmentsList += '|';
      }
    }
    assignmentsList += ')';

    let textSearch = find.replace('{{ duration }}', '\\d+');
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

      let textSearch = find.replace('{{ assignment }}', '');
      textSearch = textSearch.replace('{{ duration }}', partTiming);

      const split = src.split(textSearch.trim());

      if (split.length === 2) {
        const partType = split[0].trim();

        let textSearch = variation.replace('{{ assignment }}', partType);
        textSearch = textSearch.replace('{{ duration }}', partTiming);

        const findNextIndex = textSearch.indexOf('{{ source }}');
        const srcNext = src.substring(findNextIndex);

        const obj = { src: srcNext, type: partType, time: partTiming };

        let verifyExtract = variation.replace('{{ assignment }}', obj.type);
        verifyExtract = verifyExtract.replace('{{ duration }}', obj.time);
        verifyExtract = verifyExtract.replace('{{ source }}', obj.src);

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
};

export const extractLCAssignment = (src, lang) => {
  const variations = getLivingPartsVariations(lang).split('|');
  const patternSource = '{{ source }}';
  const patternDuration = '{{ duration }}';
  const patternContent = '{{ content }}';

  let result;
  for (const variation of variations) {
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

export const extractCBSSource = (src, lang) => {
  const variations = getCBSVariations(lang).split('|');

  const pattern = '{{ source }}';

  let result;
  for (const variation of variations) {
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

  throw new JWEPUBParserError('lc-cbs', `Parsing failed for Congregation Bible Study part. The input was: ${src}`);
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

  if (typeof varDay === 'number' && typeof monthIndex === 'number' && typeof varYear === 'number') {
    return { varDay, monthIndex, varYear };
  }

  throw new JWEPUBParserError('wtstudy', `Parsing failed for Watchtower Study Date. The input was: ${src}`);
};
