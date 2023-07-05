import * as path from 'path-browserify';

import E from '../locales/en/text.json';
import F from '../locales/fr-FR/text.json';
import MG from '../locales/mg-MG/text.json';
import T from '../locales/pt-BR/text.json';
import TND from '../locales/mg-TND/text.json';
import TNK from '../locales/mg-TNK/text.json';
import TTM from '../locales/mg-TTM/text.json';
import VZ from '../locales/mg-VZ/text.json';

window.path = path;
window.jw_epub_parser = {
	languages: { E, F, MG, T, TND, TNK, TTM, VZ },
};
