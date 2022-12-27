# JW EPUB Parser

[![CI](https://github.com/sws2apps/jw-epub-parser/actions/workflows/ci.yml/badge.svg)](https://github.com/sws2apps/jw-epub-parser/actions/workflows/ci.yml)
[![CD](https://github.com/sws2apps/jw-epub-parser/actions/workflows/deploy.yml/badge.svg)](https://github.com/sws2apps/jw-epub-parser/actions/workflows/deploy.yml)
[![jw-epub-parser](https://snyk.io/advisor/npm-package/jw-epub-parser/badge.svg)](https://snyk.io/advisor/npm-package/jw-epub-parser)

An EPUB Parser to extract the needed source materials from Meeting Workbook EPUB file. Support for parsing Watchtower Study will be added in future release. This tool was originally created to complement the Scheduling Workbox System (SWS) utilities. But why parsing EPUB file? Should it not be easy to get data directly from the website? Well, we want to do our best to be faithful in what is least, in order to be faithful also in much. The [Terms of Use and License to Use Website](https://www.jw.org/en/terms-of-use/) on jw.org makes it clear that extracting, harvesting, or scraping data, HTML, or text from the website is not recommended.

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
```

### loadEPUB(epubData)

function: asynchronous

#### epubData

type: `string` or `blob` or `url`

It can be the path to the EPUB file or EPUB file's blob or url to download the EPUB file

## Return

By calling the `loadEPUB` function, it will return an object which contains three properties:

| Return     |  Type   | Description                                                                                             |
| ---------- | :-----: | ------------------------------------------------------------------------------------------------------- |
| mwbYear    | string  | The current year of the Meeting Workbook that is being parsed                                           |
| weeksCount | integer | The number of weeks available in the EPUB file                                                          |
| weeksData  |  array  | Array containing the weekly source material. Each property available for each object is available below |

Here are the list of all available properties in each object in the `weeksData` array:

| Name               |  Type   | Description                                                                                                                     |
| ------------------ | :-----: | ------------------------------------------------------------------------------------------------------------------------------- |
| weekDate           | string  | Week date. For enhanced parsing, it is formatted as `m/d/yyyy`                                                                  |
| weekDateLocale\*   | string  | Week date                                                                                                                       |
| weeklyBibleReading | string  | Weekly Bible Reading                                                                                                            |
| songFirst          | integer | First song                                                                                                                      |
| tgw10Talk          | string  | 10 min talk title of the Treasures from God’s Word                                                                              |
| tgwBRead           | string  | Bible Reading for student                                                                                                       |
| tgwBReadStudy\*    | integer | Study Point for Bible Reading part                                                                                              |
| ayfCount           | integer | Number of parts in Apply Yourself to the Field Ministry                                                                         |
| ayfPart1           | string  | Part 1 in Apply Yourself to the Field Ministry                                                                                  |
| ayfPart1Time\*     | integer | Timing of Part 1 in Apply Yourself to the Field Ministry                                                                        |
| ayfPart1Type\*     | string  | Type of Part 1 in Apply Yourself to the Field Ministry                                                                          |
| ayfPart1Study\*    | integer | Study Point of Part 1 in Apply Yourself to the Field Ministry                                                                   |
| ayfPart2           | string  | Part 2 in Apply Yourself to the Field Ministry. This property will not be available if `ayfCount` is 1                          |
| ayfPart2Time\*     | integer | Timing of Part 2 in Apply Yourself to the Field Ministry. This property will not be available if `ayfCount` is 1                |
| ayfPart2Type\*     | string  | Type of Part 2 in Apply Yourself to the Field Ministry. This property will not be available if `ayfCount` is 1                  |
| ayfPart2Study\*    | integer | Study Point of Part 2 in Apply Yourself to the Field Ministry. This property will not be available if `ayfCount` is 1           |
| ayfPart3           | string  | Part 3 in Apply Yourself to the Field Ministry. This property will not be available if `ayfCount` is less than 3                |
| ayfPart3Time\*     | integer | Timing of Part 3 in Apply Yourself to the Field Ministry. This property will not be available if `ayfCount` is less than 3      |
| ayfPart3Type\*     | string  | Type of Part 3 in Apply Yourself to the Field Ministry. This property will not be available if `ayfCount` is less than 3        |
| ayfPart3Study\*    | integer | Study Point of Part 3 in Apply Yourself to the Field Ministry. This property will not be available if `ayfCount` is less than 3 |
| ayfPart4           | string  | Part 4 in Apply Yourself to the Field Ministry. This property will not be available if `ayfCount` is less than 4                |
| ayfPart4Time\*     | integer | Timing of Part 4 in Apply Yourself to the Field Ministry. This property will not be available if `ayfCount` is less than 4      |
| ayfPart4Type\*     | string  | Type of Part 4 in Apply Yourself to the Field Ministry. This property will not be available if `ayfCount` is less than 4        |
| ayfPart4Study\*    | integer | Study Point of Part 4 in Apply Yourself to the Field Ministry. This property will not be available if `ayfCount` is less than 4 |
| songMiddle         | integer | Middle song                                                                                                                     |
| lcCount            | integer | Number of parts in Living as Christians                                                                                         |
| lcPart1            | string  | Part 1 in Living as Christians                                                                                                  |
| lcPart1Time\*      | integer | Timing of Part 1 in Living as Christians                                                                                        |
| lcPart1Content\*   | string  | Content of Part 1 in Living as Christians                                                                                       |
| lcPart2            | string  | Part 2 in Living as Christians. This property will not be available if `lcCount` is 1                                           |
| lcPart2Time\*      | integer | Timing of Part 2 in Living as Christians. This property will not be available if `lcCount` is 1                                 |
| lcPart2Content\*   | string  | Content of Part 2 in Living as Christians. This property will not be available if `lcCount` is 1                                |
| lcCBS              | string  | Congregation Bible Study source material                                                                                        |
| songConclude       | integer | Concluding song                                                                                                                 |

\* These properties are only available when enhanced parsing is available for the language you want to parse.

Currently, we only support enhanced parsing for the following languages:

```bash
Cinyanja (CIN), Enlish (E), French (F), Malagasy (MG)
```

For the other languages, you may use your own method to convert these outputs according to your needs to get the needed informations. If you want to contribute and add your language in the enhanced parsing list, please follow [this guide](./ADD_LANGUAGE.md).

## Sample Output

Here's an example on how the result of the method looks like:

### With enhanced parsing

```js
{
  weeksCount: 7,
  mwbYear: '2023',
  weeksData: [
    {
      weekDate: '3/6/2023',
      weekDateLocale: '6-12 Martsa',
      weeklyBibleReading: '1 TANTARA 23-26',
      songFirst: 123,
      tgw10Talk: '“Lasa Voalamina Tsara ny Fanompoana tao Amin’ny Tempoly”',
      tgwBRead: '1Ta 23:21-32',
      tgwBReadStudy: 5,
      ayfCount: 3,
      ayfPart1: 'Fiaraha-midinika. Alefaso ilay video hoe Ezaka Manokana Hizarana Fanasana Fahatsiarovana. Ajanòny ilay video isaky ny misy fiatoana, ary iaraho midinika ny fanontaniana mipoitra eo.',
      ayfPart1Time: 5,
      ayfPart1Type: 'Video Fanasana Fahatsiarovana',
      ayfPart2: 'Atombohy amin’ny foto-kevitra ao amin’ny hevitra azo resahina. Liana ilay olona, dia asehoy azy ilay video hoe Tsarovy ny Nahafatesan’i Jesosy (tsy
tena alefa anefa ilay izy). Iaraho midinika ilay izy avy eo.',
      ayfPart2Time: 3,
      ayfPart2Type: 'Fanasana Fahatsiarovana',
      ayfPart2Study: 1,
      ayfPart3: 'w11 1/6 14-15: Foto-kevitra: Nahoana no Voalamina Tsara ny Kristianina?',
      ayfPart3Time: 5,
      ayfPart3Type: 'Lahateny',
      ayfPart3Study: 1,
      songMiddle: 101,
      lcCount: 2,
      lcPart1: '“Te Hanampy ve Ianao Rehefa Misy Loza Mitranga?”',
      lcPart1Time: 10,
      lcPart1Content: 'Fiaraha-midinika sy video.',
      lcPart2: 'Ezaka Manokana Hizarana Fanasana Fahatsiarovana Manomboka ny Asabotsy 11 Martsa',
      lcPart2Time: 5,
      lcPart2Content: 'Fiaraha-midinika. Resaho kely izay voalazan’ilay fanasana. Resaho koa ny fandaharana ataon’ny fiangonana momba ny lahateny manokana sy ny Fahatsiarovana ary ny fomba hamitana ny faritany.',
      lcCBS: 'lff lesona 39 sy fanamarihana 3',
      songConclude: 127
    },
    {
      weekDate: '3/13/2023',
      weekDateLocale: '13-19 Martsa',
      weeklyBibleReading: '1 TANTARA 27-29',
      songFirst: 133,
      tgw10Talk: '“Torohevitry ny Ray Be Fitiavana ho An-janany”',
      tgwBRead: '1Ta 27:1-15',
      tgwBReadStudy: 1,
      ayfCount: 3,
      ayfPart1: 'Fiaraha-midinika. Alefaso ilay video hoe Fiverenana Mitsidika: Jesosy​—Mt 20:28. Ajanòny ilay video isaky ny misy fiatoana, ary iaraho midinika ny f
anontaniana mipoitra eo.',
      ayfPart1Time: 5,
      ayfPart1Type: 'Video Fiverenana Mitsidika',
      ayfPart2: 'Mitsidika olona liana sy nandray fanasana Fahatsiarovana ianao. Asehoy azy ilay video hoe Inona no Antony Nahafatesan’i Jesosy? (tsy tena alefa anefa ilay izy) Iaraho midinika ilay izy.',
      ayfPart2Time: 4,
      ayfPart2Type: 'Fiverenana Mitsidika',
      ayfPart2Study: 9,
      ayfPart3: 'Mitsidika olona liana sy nandray fanasana Fahatsiarovana ianao. Manomboha fampianarana Baiboly amin’ilay bokikely hoe Ankafizo Mandrakizay ny Fiainana!',
      ayfPart3Time: 4,
      ayfPart3Type: 'Fiverenana Mitsidika',
      ayfPart3Study: 6,
      songMiddle: 4,
      lcCount: 2,
      lcPart1: 'Zavatra Ilain’ny Fiangonana',
      lcPart1Time: 5,
      lcPart2: 'Zava-bitan’ny Fandaminana',
      lcPart2Time: 10,
      lcPart2Content: 'Alefaso ilay video hoe Zava-bitan’ny Fandaminana, izay tokony halefa amin’ity Martsa ity.',
      lcCBS: 'lff lesona 40',
      songConclude: 45
    },
    ...
  ]
}
```

### Without enhanced parsing

```js
{
  weeksCount: 7,
  mwbYear: '2023',
  weeksData: [
    {
      weekDate: '6-12 Martsa',
      weeklyBibleReading: '1 TANTARA 23-26',
      songFirst: 123,
      tgw10Talk: '“Lasa Voalamina Tsara ny Fanompoana tao Amin’ny Tempoly”: (10 min.)',
      tgwBRead: 'Famakiana Baiboly: (4 min.) 1Ta 23:21-32 (th lesona 5)',
      ayfCount: 3,
      ayfPart1: 'Video Fanasana Fahatsiarovana: (5 min.) Fiaraha-midinika. Alefaso ilay video hoe Ezaka Manokana Hizarana Fanasana Fahatsiarovana. Ajanòny ilay video isaky ny misy fiatoana, ary iaraho midinika ny fanontaniana mipoitra eo.',
      ayfPart2: 'Fanasana Fahatsiarovana: (3 min.) Atombohy amin’ny foto-kevitra ao amin’ny hevitra azo resahina. Liana ilay olona, dia asehoy azy ilay video hoe Tsarovy ny Nahafatesan’i Jesosy (tsy tena alefa anefa ilay izy). Iaraho midinika ilay izy avy eo. (th lesona 11)',
      ayfPart3: 'Lahateny: (5 min.) w11 1/6 14-15: Foto-kevitra: Nahoana no Voalamina Tsara ny Kristianina? (th lesona 14)',
      songMiddle: 101,
      lcCount: 2,
      lcPart1: '“Te Hanampy ve Ianao Rehefa Misy Loza Mitranga?”: (10 min.) Fiaraha-midinika sy video.',
      lcPart2: 'Ezaka Manokana Hizarana Fanasana Fahatsiarovana Manomboka ny Asabotsy 11 Martsa: (5 min.) Fiaraha-midinika. Resaho kely izay voalazan’ilay fanasana.
Resaho koa ny fandaharana ataon’ny fiangonana momba ny lahateny manokana sy ny Fahatsiarovana ary ny fomba hamitana ny faritany.',
      lcCBS: 'Fianarana Baiboly: (30 min.) lff lesona 39 sy fanamarihana 3',
      songConclude: 127
    },
    {
      weekDate: '13-19 Martsa',
      weeklyBibleReading: '1 TANTARA 27-29',
      songFirst: 133,
      tgw10Talk: '“Torohevitry ny Ray Be Fitiavana ho An-janany”: (10 min.)',
      tgwBRead: 'Famakiana Baiboly: (4 min.) 1Ta 27:1-15 (th lesona 10)',
      ayfCount: 3,
      ayfPart1: 'Video Fiverenana Mitsidika: (5 min.) Fiaraha-midinika. Alefaso ilay video hoe Fiverenana Mitsidika: Jesosy​—Mt 20:28. Ajanòny ilay video isaky ny mi
sy fiatoana, ary iaraho midinika ny fanontaniana mipoitra eo.',
      ayfPart2: 'Fiverenana Mitsidika: (4 min.) Mitsidika olona liana sy nandray fanasana Fahatsiarovana ianao. Asehoy azy ilay video hoe Inona no Antony Nahafatesan’i Jesosy? (tsy tena alefa anefa ilay izy) Iaraho midinika ilay izy. (th lesona 9)',
      ayfPart3: 'Fiverenana Mitsidika: (4 min.) Mitsidika olona liana sy nandray fanasana Fahatsiarovana ianao. Manomboha fampianarana Baiboly amin’ilay bokikely hoe Ankafizo Mandrakizay ny Fiainana! (th lesona 6)',
      songMiddle: 4,
      lcCount: 2,
      lcPart1: 'Zavatra Ilain’ny Fiangonana: (5 min.)',
      lcPart2: 'Zava-bitan’ny Fandaminana: (10 min.) Alefaso ilay video hoe Zava-bitan’ny Fandaminana, izay tokony halefa amin’ity Martsa ity.',
      lcCBS: 'Fianarana Baiboly: (30 min.) lff lesona 40',
      songConclude: 45
    },
    ...
  ]
}
```
