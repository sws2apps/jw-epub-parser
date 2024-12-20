import * as path from 'path-browserify';

import CH from '../locales/cmn-Hant/text.json';
import CHS from '../locales/ch-CHS/text.json';
import CR from '../locales/ht-HT/text.json';
import E from '../locales/en/text.json';
import F from '../locales/fr-FR/text.json';
import FI from '../locales/fi-FI/text.json';
import I from '../locales/it-IT/text.json';
import IL from '../locales/ilo-PH/text.json';
import J from '../locales/ja-JP/text.json';
import K from '../locales/uk-UA/text.json';
import KO from '../locales/ko-KR/text.json';
import M from '../locales/ro-RO/text.json';
import MG from '../locales/mg-MG/text.json';
import O from '../locales/nl-NL/text.json';
import P from '../locales/pl-PL/text.json';
import PGW from '../locales/wes-PGW/text.json';
import S from '../locales/es-ES/text.json';
import ST from '../locales/et-EE/text.json';
import SV from '../locales/sl-SI/text.json';
import SW from '../locales/sw-KE/text.json';
import T from '../locales/pt-BR/text.json';
import TG from '../locales/tl-PH/text.json';
import TK from '../locales/tr-TR/text.json';
import TND from '../locales/mg-TND/text.json';
import TNK from '../locales/mg-TNK/text.json';
import TPO from '../locales/pt-PT/text.json';
import TTM from '../locales/mg-TTM/text.json';
import TW from '../locales/tw-TW/text.json';
import U from '../locales/ru-RU/text.json';
import VZ from '../locales/mg-VZ/text.json';
import X from '../locales/de-DE/text.json';
import Z from '../locales/sv-SE/text.json';

declare global {
  interface Window {
    jw_epub_parser: any;
  }
}

window.jw_epub_parser = {
  languages: {
    CH,
    CHS,
    CR,
    E,
    F,
    FI,
    I,
    IL,
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
};
