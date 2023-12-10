import * as path from 'path-browserify';

import E from '../locales/en/text.json';
import F from '../locales/fr-FR/text.json';
import I from '../locales/it-IT/text.json';
import K from '../locales/uk-UA/text.json';
import MG from '../locales/mg-MG/text.json';
import T from '../locales/pt-BR/text.json';
import TND from '../locales/mg-TND/text.json';
import TNK from '../locales/mg-TNK/text.json';
import TTM from '../locales/mg-TTM/text.json';
import VZ from '../locales/mg-VZ/text.json';
import X from '../locales/de-DE/text.json';

declare global {
	interface Window {
		jw_epub_parser: any;
	}
}

window.jw_epub_parser = {
	languages: { E, F, I, K, MG, T, TND, TNK, TTM, VZ, X },
	path: path,
};
