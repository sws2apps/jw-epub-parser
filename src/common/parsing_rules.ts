import { JWEPUBParserError } from '../classes/error.js';
import { getPartMinutesSeparatorVariations } from './language_rules.js';

export const extractSongNumber = (src: string) => {
  const parseNum = src.match(/(\d+)/);

  if (parseNum && parseNum.length > 0) {
    const firstNumber = +parseNum[0];

    if (firstNumber <= 158) {
      return firstNumber;
    }
  }

  return src;
};

export const extractSourceEnhanced = (src: string, lang: string) => {
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
      const duration = +match[0].match(/\d+/)![0];
      const regexStartColumn = /^[:.「]/;
      const regexEndColumn = /[:」]$/;

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

      result = { type: assignment, time: duration, src: source, fulltitle: tmpAssignment };
    }
  }

  if (result) return result;

  throw new JWEPUBParserError('jw-epub-parser', `Parsing failed. The input was: ${src}`);
};
