import * as path from 'path';
import { readFile } from 'fs/promises';

import E from '../locales/en/text.json' assert { type: 'json' };
import F from '../locales/fr-FR/text.json' assert { type: 'json' };
import I from '../locales/it-IT/text.json' assert { type: 'json' };
import J from '../locales/ja-JP/text.json' assert { type: 'json' };
import K from '../locales/uk-UA/text.json' assert { type: 'json' };
import MG from '../locales/mg-MG/text.json' assert { type: 'json' };
import P from '../locales/pl-PL/text.json' assert { type: 'json' };
import T from '../locales/pt-BR/text.json' assert { type: 'json' };
import TND from '../locales/mg-TND/text.json' assert { type: 'json' };
import TNK from '../locales/mg-TNK/text.json' assert { type: 'json' };
import TTM from '../locales/mg-TTM/text.json' assert { type: 'json' };
import VZ from '../locales/mg-VZ/text.json' assert { type: 'json' };
import X from '../locales/de-DE/text.json' assert { type: 'json' };

declare global {
	var jw_epub_parser: any;
}

global.jw_epub_parser = {
	languages: { E, F, I, J, K, MG, P, T, TND, TNK, TTM, VZ, X },
	path: path,
	readFile: readFile,
};
