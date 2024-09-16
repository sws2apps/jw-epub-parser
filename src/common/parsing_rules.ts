import { JWEPUBParserError } from '../classes/error.js';
import { LangRegExp } from '../types/index.js';
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
  const variations = getPartMinutesSeparatorVariations(lang)

  // separate minutes from title
  const firstPatternCommon = new RegExp(`(.+?)[（(](\\d+)(?: |  )?(?:${variations})[）)](?: |. )?(.+?)?$`,'giu')
  const firstPatternTW = new RegExp(`(.+?)(?: )?\\(${variations}(?: )?(\\d+)\\)(?: )?(.+?)?$`,'giu')

  const firstPattern: LangRegExp = {
    common: firstPatternCommon,
    TW: firstPatternTW
  }

  const langPattern = firstPattern[lang] || firstPattern.common;

  const matchFirstPattern = src.match(langPattern);

  if (!matchFirstPattern) {
    throw new  JWEPUBParserError('jw-epub-parser', `Parsing failed. The input was: ${src}`);
  }

  const groupsFirstPattern = Array.from(langPattern.exec(src)!);

  const fulltitle = groupsFirstPattern.at(1)!.trim()
  const time = +groupsFirstPattern.at(2)!.trim()
  const source = groupsFirstPattern.at(3)?.trim()

  // separate index from title
  const nextPattern =  /^(:?\d+)(?:．|.\s)(.+?)$/giu

  const matchNextPattern = fulltitle.match(nextPattern);

  if (!matchNextPattern) {
    throw new  JWEPUBParserError('jw-epub-parser', `Parsing failed. The input was: ${src}`);
  }

  const groupsNextPattern = Array.from(nextPattern.exec(fulltitle)!);
  const type = groupsNextPattern.at(2)!.trim()
  
  return {type, src: source, time, fulltitle}
};
