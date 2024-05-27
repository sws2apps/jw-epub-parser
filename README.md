# JW EPUB Parser

[![CI](https://github.com/sws2apps/jw-epub-parser/actions/workflows/ci.yml/badge.svg)](https://github.com/sws2apps/jw-epub-parser/actions/workflows/ci.yml)
[![CD](https://github.com/sws2apps/jw-epub-parser/actions/workflows/deploy.yml/badge.svg)](https://github.com/sws2apps/jw-epub-parser/actions/workflows/deploy.yml)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)
[![jw-epub-parser](https://snyk.io/advisor/npm-package/jw-epub-parser/badge.svg)](https://snyk.io/advisor/npm-package/jw-epub-parser)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=sws2apps_jw-epub-parser&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=sws2apps_jw-epub-parser)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=sws2apps_jw-epub-parser&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=sws2apps_jw-epub-parser)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=sws2apps_jw-epub-parser&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=sws2apps_jw-epub-parser)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=sws2apps_jw-epub-parser&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=sws2apps_jw-epub-parser)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=sws2apps_jw-epub-parser&metric=bugs)](https://sonarcloud.io/summary/new_code?id=sws2apps_jw-epub-parser)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=sws2apps_jw-epub-parser&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=sws2apps_jw-epub-parser)

![epub-badge@3x](https://github.com/sws2apps/jw-epub-parser/assets/80993061/c7d7c280-f838-4ff3-a021-d669de4e195c)

#### An EPUB Parser to extract the needed source materials from Meeting Workbook and Watchtower Study EPUB files.

## Install

```bash
npm i jw-epub-parser
```

## Usage

```js
// browser
import { loadEPUB } from 'jw-epub-parser';

// node esm
import { loadEPUB } from 'jw-epub-parser/dist/node/index.js';

// node commonjs
const { loadEPUB } = require('jw-epub-parser/dist/node/index.cjs');

// sample usage
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

| Name                     |       Type        | Description                                                                                                                     |
| ------------------------ | :---------------: | ------------------------------------------------------------------------------------------------------------------------------- |
| mwb_week_date            |      string       | Week date. For enhanced parsing, it is formatted as `yyyy/mm/dd`                                                                |
| mwb_week_date_locale\*   |      string       | Week date                                                                                                                       |
| mwb_weekly_bible_reading |      string       | Weekly Bible Reading                                                                                                            |
| mwb_song_first           |      integer      | First song                                                                                                                      |
| mwb_tgw_talk             |      string       | 10 min talk title of the Treasures from God’s Word                                                                              |
| mwb_tgw_talk_title\*     |      string       | 10 min talk full title of the Treasures from God’s Word                                                                         |
| mwb_tgw_gems_title       |      string       | Spiritual gems full title of the Treasures from God’s Word                                                                      |
| mwb_tgw_bread            |      string       | Bible Reading for student                                                                                                       |
| mwb_tgw_bread_title\*    |      string       | Bible Reading assignment full title for student                                                                                 |
| mwb_ayf_count            |      integer      | Number of parts in Apply Yourself to the Field Ministry                                                                         |
| mwb_ayf_part1            |      string       | Part 1 in Apply Yourself to the Field Ministry                                                                                  |
| mwb_ayf_part1_time\*     |      integer      | Timing of Part 1 in Apply Yourself to the Field Ministry                                                                        |
| mwb_ayf_part1_type\*     |      string       | Type of Part 1 in Apply Yourself to the Field Ministry                                                                          |
| mwb_ayf_part1_title\*    |      string       | Assignment full title of Part 1 in Apply Yourself to the Field Ministry                                                         |
| mwb_ayf_part2            |      string       | Part 2 in Apply Yourself to the Field Ministry. This property will not be available if `mwb_ayf_count` is 1                     |
| mwb_ayf_part2_time\*     |      integer      | Timing of Part 2 in Apply Yourself to the Field Ministry. This property will not be available if `mwb_ayf_count` is 1           |
| mwb_ayf_part2_type\*     |      string       | Type of Part 2 in Apply Yourself to the Field Ministry. This property will not be available if `mwb_ayf_count` is 1             |
| mwb_ayf_part2_title\*    |      string       | Assignment full title of Part 2 in Apply Yourself to the Field Ministry                                                         |
| mwb_ayf_part3            |      string       | Part 3 in Apply Yourself to the Field Ministry. This property will not be available if `mwb_ayf_count` is less than 3           |
| mwb_ayf_part3_time\*     |      integer      | Timing of Part 3 in Apply Yourself to the Field Ministry. This property will not be available if `mwb_ayf_count` is less than 3 |
| mwb_ayf_part3_type\*     |      string       | Type of Part 3 in Apply Yourself to the Field Ministry. This property will not be available if `mwb_ayf_count` is less than 3   |
| mwb_ayf_part3_title\*    |      string       | Assignment full title of Part 3 in Apply Yourself to the Field Ministry                                                         |
| mwb_ayf_part4            |      string       | Part 4 in Apply Yourself to the Field Ministry. This property will not be available if `mwb_ayf_count` is less than 4           |
| mwb_ayf_part4_time\*     |      integer      | Timing of Part 4 in Apply Yourself to the Field Ministry. This property will not be available if `mwb_ayf_count` is less than 4 |
| mwb_ayf_part4_type\*     |      string       | Type of Part 4 in Apply Yourself to the Field Ministry. This property will not be available if `mwb_ayf_count` is less than 4   |
| mwb_ayf_part4_title\*    |      string       | Assignment full title of Part 4 in Apply Yourself to the Field Ministry                                                         |
| mwb_song_middle          |      integer      | Middle song                                                                                                                     |
| mwb_lc_count             |      integer      | Number of parts in Living as Christians                                                                                         |
| mwb_lc_part1             |      string       | Part 1 in Living as Christians                                                                                                  |
| mwb_lc_part1_time\*      |      integer      | Timing of Part 1 in Living as Christians                                                                                        |
| mwb_lc_part1_content\*   |      string       | Content of Part 1 in Living as Christians                                                                                       |
| mwb_lc_part1_title\*     |      string       | Full title of Part 1 in Living as Christians                                                                                    |
| mwb_lc_part2             |      string       | Part 2 in Living as Christians. This property will not be available if `mwb_lc_count` is 1                                      |
| mwb_lc_part2_time\*      |      integer      | Timing of Part 2 in Living as Christians. This property will not be available if `mwb_lc_count` is 1                            |
| mwb_lc_part2_content\*   |      string       | Content of Part 2 in Living as Christians. This property will not be available if `mwb_lc_count` is 1                           |
| mwb_lc_part2_title\*     |      string       | Full title of Part 2 in Living as Christians                                                                                    |
| mwb_lc_cbs               |      string       | Congregation Bible Study source material                                                                                        |
| mwb_lc_cbs_title\*       |      string       | Congregation Bible Study assignment full title                                                                                  |
| mwb_song_conclude        | integer or string | Concluding song. When the song number is out of range, it will be the default text from the Meeting Workbook.                   |

#### Watchtowet Study Data

| Name                    |  Type   | Description                                                      |
| ----------------------- | :-----: | ---------------------------------------------------------------- |
| w_study_date            | string  | Week date. For enhanced parsing, it is formatted as `yyyy/mm/dd` |
| w_study_date_locale\*   | string  | Week date                                                        |
| w_study_title           | string  | Watchtower Study Article Title                                   |
| w_study_opening_song    | integer | Opening Song for the Watchtower Study                            |
| w_study_concluding_song | integer | Concluding Song for the Watchtower Study                         |

\* These properties are only available when enhanced parsing is available for the language you parse.

Currently, we only support enhanced parsing for the following languages:

```bash
Enlish
French
German
Italian
Japanese
Madagascar Sign Language, Malagasy
Polish, Portuguese Brazil
Romanian, Russian
Spanish
Tagalog, Tandroy, Tankarana, Turkish, Twin
Ukrainian
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
    mwb_week_date: '2024/07/01',
    mwb_week_date_locale: 'JULY 1-7',
    mwb_weekly_bible_reading: 'PSALMS 57-59',
    mwb_song_first: 148,
    mwb_tgw_talk: 'Jehovah Frustrates Those Who Oppose His People',
    mwb_tgw_talk_title: '1. Jehovah Frustrates Those Who Oppose His People',
    mwb_tgw_gems_title: '2. Spiritual Gems',
    mwb_tgw_bread: 'Ps 59:1-17 (th study 12)',
    mwb_tgw_bread_title: '3. Bible Reading',
    mwb_ayf_count: 2,
    mwb_ayf_part1: 'Discussion. Play the VIDEO, and then discuss lmd lesson 7 points 1-2.',
    mwb_ayf_part1_time: 7,
    mwb_ayf_part1_type: 'Perseverance​—What Paul Did',
    mwb_ayf_part1_title: '4. Perseverance​—What Paul Did',
    mwb_ayf_part2: 'Discussion based on lmd lesson 7 points 3-5 and “See Also.”',
    mwb_ayf_part2_time: 8,
    mwb_ayf_part2_type: 'Perseverance​—Imitate Paul',
    mwb_ayf_part2_title: '5. Perseverance​—Imitate Paul',
    mwb_song_middle: 65,
    mwb_lc_count: 1,
    mwb_lc_part1: 'Local Needs',
    mwb_lc_part1_time: 15,
    mwb_lc_part1_title: '6. Local Needs',
    mwb_lc_cbs: 'bt chap. 12 ¶1-6, box on p. 96',
    mwb_lc_cbs_title: '7. Congregation Bible Study',
    mwb_song_conclude: 78
  },
	...
]
```

#### Watchtower Study Data

```js
[
  {
    w_study_date: '2024/09/09',
    w_study_date_locale: 'Study Article 27: September 9-15, 2024',
    w_study_title: 'Be Courageous Like Zadok',
    w_study_opening_song: 73,
    w_study_concluding_song: 126
  },
	...
]
```

### Without enhanced parsing

#### Meeting Workbook Data

```js
[
  {
    mwb_week_date: '7月1-7日',
    mwb_weekly_bible_reading: '诗篇57－59篇',
    mwb_song_first: 148,
    mwb_tgw_talk: '1．耶和华不会让反对我们的人得逞 （10分钟）',
    mwb_tgw_gems_title: '2．经文宝石 （10分钟）',
    mwb_tgw_bread: '3．经文朗读 （4分钟）诗59:1-17（《教导》第12课）',
    mwb_ayf_count: 2,
    mwb_ayf_part1: '4．坚持不懈——保罗怎么做 （7分钟）节目包括讨论。先观看短片，然后讨论《爱心》第7课1-2点。',
    mwb_ayf_part2: '5．坚持不懈——向保罗学习 （8分钟）讨论《爱心》第7课3-5点以及“请看”。',
    mwb_song_middle: 65,
    mwb_lc_count: 1,
    mwb_lc_part1: '6．本地需要 （15分钟）',
    mwb_lc_cbs: '7．会众研经班 （30分钟）《作见证》第12章1-6段以及96页的附栏',
    mwb_song_conclude: 78
  },
	...
]
```

#### Watchtower Study Data

```js
[
  {
    w_study_date: '研究班课文27：2024年9月9-15日',
    w_study_title: '效法撒督，显出勇气',
    w_study_opening_song: 73,
    w_study_concluding_song: 126
  },
	...
]
```
