import './utils.node.js';
import { startParse } from '../common/parser.js';
import { validateInput } from '../common/epub_validation.js';
import { MWBSchedule, WSchedule } from '../types/index.js';

export type { MWBSchedule, WSchedule }

export const loadEPUB = async (epubInput: string | Blob | { url: string }) => {
  try {
    validateInput(epubInput);

    const data = await startParse(epubInput);
    return data as any;
  } catch (err) {
    console.error(err);

    throw new Error((err as Error)?.message);
  }
};
