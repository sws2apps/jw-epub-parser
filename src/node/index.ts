import './utils.node.js';
import { startParse } from '../common/parser.js';
import { validateInput } from '../common/epub_validation.js';

export const loadEPUB = async (epubInput: string | Blob | { url: string }) => {
  try {
    validateInput(epubInput);

    const data = await startParse(epubInput);
    return data;
  } catch (err) {
    console.error(err);
  }
};
