# JW EPUB Parser

[![CI](https://github.com/sws2apps/jw-epub-parser/actions/workflows/ci.yml/badge.svg)](https://github.com/sws2apps/jw-epub-parser/actions/workflows/ci.yml)
[![CD](https://github.com/sws2apps/jw-epub-parser/actions/workflows/deploy.yml/badge.svg)](https://github.com/sws2apps/jw-epub-parser/actions/workflows/deploy.yml)
[![jw-epub-parser](https://snyk.io/advisor/npm-package/jw-epub-parser/badge.svg)](https://snyk.io/advisor/npm-package/jw-epub-parser)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=sws2apps_jw-epub-parser&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=sws2apps_jw-epub-parser)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=sws2apps_jw-epub-parser&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=sws2apps_jw-epub-parser)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=sws2apps_jw-epub-parser&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=sws2apps_jw-epub-parser)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=sws2apps_jw-epub-parser&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=sws2apps_jw-epub-parser)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=sws2apps_jw-epub-parser&metric=bugs)](https://sonarcloud.io/summary/new_code?id=sws2apps_jw-epub-parser)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=sws2apps_jw-epub-parser&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=sws2apps_jw-epub-parser)

An EPUB Parser to extract the needed source materials from Meeting Workbook and Watchtower Study EPUB files.

## Install

```bash
npm i jw-epub-parser
```

## Usage

```js
// browser
import { loadEPUB } from 'jw-epub-parser';

// node
import { loadEPUB } from 'jw-epub-parser/dist/node/index.js';

const epubJW = await loadEPUB('/path/to/file.epub');

const epubJW = await loadEPUB({ url: epubUrl });
```

### loadEPUB(epubData)

function: asynchronous

#### epubData

type: `string` or `blob` or `url`

It can be the path to the EPUB file or EPUB file's blob or url to download the EPUB file.

## Return

By calling the `loadEPUB` function, it will return an array of objects with the following properties:

#### Meeting Workbook Data

| Name                     |       Type        | Description                                                                                                                |
| ------------------------ | :---------------: | -------------------------------------------------------------------------------------------------------------------------- |
| mwb_week_date            |      string       | Week date. For enhanced parsing, it is formatted as `mm/dd/yyyy`                                                           |
| mwb_week_date_locale\*   |      string       | Week date                                                                                                                  |
| mwb_weekly_bible_reading |      string       | Weekly Bible Reading                                                                                                       |
| mwb_song_first           |      integer      | First song                                                                                                                 |
| mwb_tgw_talk             |      string       | 10 min talk title of the Treasures from God’s Word                                                                         |
| mwb_tgw_bread            |      string       | Bible Reading for student                                                                                                  |
| mwb_ayf_count            |      integer      | Number of parts in Apply Yourself to the Field Ministry                                                                    |
| mwb_ayf_part1            |      string       | Part 1 in Apply Yourself to the Field Ministry                                                                             |
| mwb_ayf_part1_time\*     |      integer      | Timing of Part 1 in Apply Yourself to the Field Ministry                                                                   |
| mwb_ayf_part1_type\*     |      string       | Type of Part 1 in Apply Yourself to the Field Ministry                                                                     |
| mwb_ayf_part2            |      string       | Part 2 in Apply Yourself to the Field Ministry. This property will not be available if `mwb_ayf_count` is 1                     |
| mwb_ayf_part2_time\*     |      integer      | Timing of Part 2 in Apply Yourself to the Field Ministry. This property will not be available if `mwb_ayf_count` is 1           |
| mwb_ayf_part2_type\*     |      string       | Type of Part 2 in Apply Yourself to the Field Ministry. This property will not be available if `mwb_ayf_count` is 1             |
| mwb_ayf_part3            |      string       | Part 3 in Apply Yourself to the Field Ministry. This property will not be available if `mwb_ayf_count` is less than 3           |
| mwb_ayf_part3_time\*     |      integer      | Timing of Part 3 in Apply Yourself to the Field Ministry. This property will not be available if `mwb_ayf_count` is less than 3 |
| mwb_ayf_part3_type\*     |      string       | Type of Part 3 in Apply Yourself to the Field Ministry. This property will not be available if `mwb_ayf_count` is less than 3   |
| mwb_ayf_part4            |      string       | Part 4 in Apply Yourself to the Field Ministry. This property will not be available if `mwb_ayf_count` is less than 4           |
| mwb_ayf_part4_time\*     |      integer      | Timing of Part 4 in Apply Yourself to the Field Ministry. This property will not be available if `mwb_ayf_count` is less than 4 |
| mwb_ayf_part4_type\*     |      string       | Type of Part 4 in Apply Yourself to the Field Ministry. This property will not be available if `mwb_ayf_count` is less than 4   |
| mwb_song_middle          |      integer      | Middle song                                                                                                                |
| mwb_lc_count             |      integer      | Number of parts in Living as Christians                                                                                    |
| mwb_lc_part1             |      string       | Part 1 in Living as Christians                                                                                             |
| mwb_lc_part1_time\*      |      integer      | Timing of Part 1 in Living as Christians                                                                                   |
| mwb_lc_part1_content\*   |      string       | Content of Part 1 in Living as Christians                                                                                  |
| mwb_lc_part2             |      string       | Part 2 in Living as Christians. This property will not be available if `mwb_lc_count` is 1                                      |
| mwb_lc_part2_time\*      |      integer      | Timing of Part 2 in Living as Christians. This property will not be available if `mwb_lc_count` is 1                            |
| mwb_lc_part2_content\*   |      string       | Content of Part 2 in Living as Christians. This property will not be available if `mwb_lc_count` is 1                           |
| mwb_lc_cbs               |      string       | Congregation Bible Study source material                                                                                   |
| mwb_song_conclude        | integer or string | Concluding song. When the song number is out of range, it will be the default text from the Meeting Workbook.              |

#### Watchtowet Study Data

| Name                    |  Type   | Description                                                      |
| ----------------------- | :-----: | ---------------------------------------------------------------- |
| w_study_date            | string  | Week date. For enhanced parsing, it is formatted as `mm/dd/yyyy` |
| w_study_date_locale\*   | string  | Week date                                                        |
| w_study_title           | string  | Watchtower Study Article Title                                   |
| w_study_opening_song    | integer | Opening Song for the Watchtower Study                            |
| w_study_concluding_song | integer  | Concluding Song for the Watchtower Study                         |

\* These properties are only available when enhanced parsing is available for the language you parse.

Currently, we only support enhanced parsing for the following languages:

```bash
Enlish
French
Madagascar Sign Language, Malagasy
Portuguese Brazil
Tandroy, Tankarana
Vezo
```

For the other languages, you may use your own method to convert these outputs according to your needs to get the needed informations. If you want to contribute and add your language in the enhanced parsing list, or edit your language rules, please follow [this guide](./TRANSLATION.md).

## Sample Output

Here are how the results of this module look like:

### With enhanced parsing

#### Meeting Workbook Data

```js
[
  {
    mwb_week_date: '09/04/2023',
    mwb_week_date_locale: 'September 4-10',
    mwb_weekly_bible_reading: 'ESTHER 1-2',
    mwb_song_first: 137,
    mwb_tgw_talk: '“Strive to Be Modest Like Esther”',
    mwb_tgw_bread: 'Es 1:13-22 (th study 10)',
    mwb_ayf_count: 3,
    mwb_ayf_part1:
      'Discussion. Play the video Initial Call: Kingdom​—Mt 6:9, 10. Stop the video at each pause, and ask the audience the questions that appear in the video.',
    mwb_ayf_part1_time: 5,
    mwb_ayf_part1_type: 'Initial Call Video',
    mwb_ayf_part2: 'Begin with the sample conversation topic. Offer the Enjoy Life Forever! brochure. (th study 1)',
    mwb_ayf_part2_time: 3,
    mwb_ayf_part2_type: 'Initial Call',
    mwb_ayf_part3: 'w20.11 12-14 ¶3-7​—Theme: Help From Jesus and the Angels. (th study 14)',
    mwb_ayf_part3_time: 5,
    mwb_ayf_part3_type: 'Talk',
    mwb_song_middle: 106,
    mwb_lc_count: 2,
    mwb_lc_part1: 'What Your Peers Say​—Body Image',
    mwb_lc_part1_time: 5,
    mwb_lc_part1_content:
      'Discussion. Play the video. Then ask the audience: Why can it be difficult to have a balanced view of our appearance?',
    mwb_lc_part2: 'Organizational Accomplishments',
    mwb_lc_part2_time: 10,
    mwb_lc_part2_content: 'Play the Organizational Accomplishments video for September.',
    mwb_lc_cbs: 'lff lesson 56 and endnotes 6 and 7',
    mwb_song_conclude: 101,
  },
	...
]
```

#### Watchtower Study Data

```js
[
  {
    w_study_date: '11/06/2023',
    w_study_date_locale: 'Study Article 37: November 6-12, 2023',
    w_study_title: 'Rely on Jehovah, as Samson Did',
    w_study_opening_song: 30,
    w_study_concluding_song: 3,
  },
	...
]
```

### Without enhanced parsing

#### Meeting Workbook Data

```js
[
  {
    mwb_week_date: '4-10 de septiembre',
    mwb_weekly_bible_reading: 'ESTER 1, 2',
    mwb_song_first: 137,
    mwb_tgw_talk: '“Esfuércese por ser modesto como Ester” (10 mins.)',
    mwb_tgw_bread: 'Lectura de la Biblia (4 mins.): Est 1:13-22 (th lec. 10).',
    mwb_ayf_count: 3,
    mwb_ayf_part1:
      'Video de la primera conversación (5 mins.): Análisis con el auditorio. Ponga el video Primera conversación: El Reino (Mt 6:9, 10). Detenga el video en cada pausa y haga las preguntas que aparecen en él.',
    mwb_ayf_part2:
      'Primera conversación (3 mins.): Use el tema de las ideas para conversar. Luego ofrezca el folleto Disfrute de la vida (th lec. 1).',
    mwb_ayf_part3: 'Discurso (5 mins.): w20.11 12-14 párrs. 3-7. Título: Jesús y los ángeles nos ayudan (th lec. 14).',
    mwb_song_middle: 106,
    mwb_lc_count: 2,
    mwb_lc_part1:
      'Lo que opinan otros jóvenes: La apariencia (5 mins.): Análisis con el auditorio. Ponga el video. Luego pregunte: ¿por qué puede ser difícil mantener una actitud equilibrada sobre nuestra apariencia física?',
    mwb_lc_part2:
      'Logros de la organización (10 mins.): Ponga el video Logros de la organización para el mes de septiembre.',
    mwb_lc_cbs: 'Estudio bíblico de la congregación (30 mins.): lff lección 56 y notas 6 y 7.',
    mwb_song_conclude: 101,
  },
	...
]
```

#### Watchtower Study Data

```js
[
  {
    w_study_date: 'Artículo de estudio 37 (del 6 al 12 de noviembre de 2023)',
    w_study_title: 'Apóyese en Jehová, tal como lo hizo Sansón',
    w_study_opening_song: 30,
    w_study_concluding_song: 3,
  },
	...
]
```
