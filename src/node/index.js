import './utils.js';
import { startParse } from '../common/parser.js';

export const loadEPUB = async (epubInput) => {
  try {
    const data = await startParse(epubInput);
    return data;
  } catch (err) {
    throw new Error(err);
  }
};
