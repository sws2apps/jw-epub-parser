import * as path from 'path';
import { readFile } from 'fs/promises';

import CH from '../locales/cmn-Hant/text.json' assert { type: 'json' };
import CHS from '../locales/ch-CHS/text.json' assert { type: 'json' };
import CR from '../locales/ht-HT/text.json' assert { type: 'json' };
import E from '../locales/en/text.json' assert { type: 'json' };
import F from '../locales/fr-FR/text.json' assert { type: 'json' };
import FI from '../locales/fi-FI/text.json' assert { type: 'json' };
import I from '../locales/it-IT/text.json' assert { type: 'json' };
import J from '../locales/ja-JP/text.json' assert { type: 'json' };
import K from '../locales/uk-UA/text.json' assert { type: 'json' };
import KO from '../locales/ko-KR/text.json' assert { type: 'json' };
import M from '../locales/ro-RO/text.json' assert { type: 'json' };
import MG from '../locales/mg-MG/text.json' assert { type: 'json' };
import O from '../locales/nl-NL/text.json' assert { type: 'json' };
import P from '../locales/pl-PL/text.json' assert { type: 'json' };
import PGW from '../locales/wes-PGW/text.json' assert { type: 'json' };
import S from '../locales/es-ES/text.json' assert { type: 'json' };
import ST from '../locales/et-EE/text.json' assert { type: 'json' };
import SV from '../locales/sl-SI/text.json' assert { type: 'json' };
import SW from '../locales/sw-KE/text.json' assert { type: 'json' };
import T from '../locales/pt-BR/text.json' assert { type: 'json' };
import TG from '../locales/tl-PH/text.json' assert { type: 'json' };
import TK from '../locales/tr-TR/text.json' assert { type: 'json' };
import TND from '../locales/mg-TND/text.json' assert { type: 'json' };
import TNK from '../locales/mg-TNK/text.json' assert { type: 'json' };
import TPO from '../locales/pt-PT/text.json' assert { type: 'json' };
import TTM from '../locales/mg-TTM/text.json' assert { type: 'json' };
import TW from '../locales/tw-TW/text.json' assert { type: 'json' };
import U from '../locales/ru-RU/text.json' assert { type: 'json' };
import VZ from '../locales/mg-VZ/text.json' assert { type: 'json' };
import X from '../locales/de-DE/text.json' assert { type: 'json' };
import Z from '../locales/sv-SE/text.json' assert { type: 'json' };

declare global {
  var jw_epub_parser: any;
}

global.jw_epub_parser = {
  languages: {
    CH,
    CHS,
    CR,
    E,
    F,
    FI,
    I,
    J,
    K,
    KO,
    M,
    MG,
    O,
    P,
    PGW,
    S,
    ST,
    SV,
    SW,
    T,
    TG,
    TK,
    TND,
    TNK,
    TPO,
    TTM,
    TW,
    U,
    VZ,
    X,
    Z,
  },
  path: path,
  readFile: readFile,
};
