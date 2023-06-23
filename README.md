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

An EPUB Parser to extract the needed source materials from Meeting Workbook EPUB file. Support for parsing Watchtower Study will be added in a future release.

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

By calling the `loadEPUB` function, it will return an object which contains three properties:

| Return     |  Type   | Description                                                                                             |
| ---------- | :-----: | ------------------------------------------------------------------------------------------------------- |
| mwbYear    | string  | The current year of the Meeting Workbook that is being parsed                                           |
| weeksCount | integer | The number of weeks available in the EPUB file                                                          |
| weeksData  |  array  | Array containing the weekly source material. Each property available for each object is available below |

Here are the list of all available properties in each object in the `weeksData` array:

| Name               |       Type        | Description                                                                                                                |
| ------------------ | :---------------: | -------------------------------------------------------------------------------------------------------------------------- |
| weekDate           |      string       | Week date. For enhanced parsing, it is formatted as `mm/dd/yyyy`                                                           |
| weekDateLocale\*   |      string       | Week date                                                                                                                  |
| weeklyBibleReading |      string       | Weekly Bible Reading                                                                                                       |
| songFirst          |      integer      | First song                                                                                                                 |
| tgwTalk            |      string       | 10 min talk title of the Treasures from God’s Word                                                                         |
| tgwBRead           |      string       | Bible Reading for student                                                                                                  |
| ayfCount           |      integer      | Number of parts in Apply Yourself to the Field Ministry                                                                    |
| ayfPart1           |      string       | Part 1 in Apply Yourself to the Field Ministry                                                                             |
| ayfPart1Time\*     |      integer      | Timing of Part 1 in Apply Yourself to the Field Ministry                                                                   |
| ayfPart1Type\*     |      string       | Type of Part 1 in Apply Yourself to the Field Ministry                                                                     |
| ayfPart2           |      string       | Part 2 in Apply Yourself to the Field Ministry. This property will not be available if `ayfCount` is 1                     |
| ayfPart2Time\*     |      integer      | Timing of Part 2 in Apply Yourself to the Field Ministry. This property will not be available if `ayfCount` is 1           |
| ayfPart2Type\*     |      string       | Type of Part 2 in Apply Yourself to the Field Ministry. This property will not be available if `ayfCount` is 1             |
| ayfPart3           |      string       | Part 3 in Apply Yourself to the Field Ministry. This property will not be available if `ayfCount` is less than 3           |
| ayfPart3Time\*     |      integer      | Timing of Part 3 in Apply Yourself to the Field Ministry. This property will not be available if `ayfCount` is less than 3 |
| ayfPart3Type\*     |      string       | Type of Part 3 in Apply Yourself to the Field Ministry. This property will not be available if `ayfCount` is less than 3   |
| ayfPart4           |      string       | Part 4 in Apply Yourself to the Field Ministry. This property will not be available if `ayfCount` is less than 4           |
| ayfPart4Time\*     |      integer      | Timing of Part 4 in Apply Yourself to the Field Ministry. This property will not be available if `ayfCount` is less than 4 |
| ayfPart4Type\*     |      string       | Type of Part 4 in Apply Yourself to the Field Ministry. This property will not be available if `ayfCount` is less than 4   |
| songMiddle         |      integer      | Middle song                                                                                                                |
| lcCount            |      integer      | Number of parts in Living as Christians                                                                                    |
| lcPart1            |      string       | Part 1 in Living as Christians                                                                                             |
| lcPart1Time\*      |      integer      | Timing of Part 1 in Living as Christians                                                                                   |
| lcPart1Content\*   |      string       | Content of Part 1 in Living as Christians                                                                                  |
| lcPart2            |      string       | Part 2 in Living as Christians. This property will not be available if `lcCount` is 1                                      |
| lcPart2Time\*      |      integer      | Timing of Part 2 in Living as Christians. This property will not be available if `lcCount` is 1                            |
| lcPart2Content\*   |      string       | Content of Part 2 in Living as Christians. This property will not be available if `lcCount` is 1                           |
| lcCBS              |      string       | Congregation Bible Study source material                                                                                   |
| songConclude       | integer or string | Concluding song. When the song number is out of range, it will be the default text from the Meeting Workbook.              |

\* These properties are only available when enhanced parsing is available for the language you want to parse.

Currently, we only support enhanced parsing for the following languages:

```bash
Enlish
French
Malagasy
Portuguese Brazil
Tandroy, Tankarana
Vezo
```

For the other languages, you may use your own method to convert these outputs according to your needs to get the needed informations. If you want to contribute and add your language in the enhanced parsing list, or edit your language rules, please follow [this guide](./TRANSLATION.md).

## Sample Output

Here are how the results of this module look like:

### With enhanced parsing

```js
{
	weeksCount: 7,
 	mwbYear: '2023',
  	weeksData: [
    	{
			weekDate: '09/04/2023',
			weekDateLocale: 'September 4-10',
			weeklyBibleReading: 'ESTHER 1-2',
			songFirst: 137,
			tgwTalk: '“Strive to Be Modest Like Esther”',
			tgwBRead: 'Es 1:13-22 (th study 10)',
			ayfCount: 3,
			ayfPart1:
				'Discussion. Play the video Initial Call: Kingdom​—Mt 6:9, 10. Stop the video at each pause, and ask the audience the questions that appear in the video.',
			ayfPart1Time: 5,
			ayfPart1Type: 'Initial Call Video',
			ayfPart2: 'Begin with the sample conversation topic. Offer the Enjoy Life Forever! brochure. (th study 1)',
			ayfPart2Time: 3,
			ayfPart2Type: 'Initial Call',
			ayfPart3: 'w20.11 12-14 ¶3-7​—Theme: Help From Jesus and the Angels. (th study 14)',
			ayfPart3Time: 5,
			ayfPart3Type: 'Talk',
			songMiddle: 106,
			lcCount: 2,
			lcPart1: 'What Your Peers Say​—Body Image',
			lcPart1Time: 5,
			lcPart1Content:
				'Discussion. Play the video. Then ask the audience: Why can it be difficult to have a balanced view of our appearance?',
			lcPart2: 'Organizational Accomplishments',
			lcPart2Time: 10,
			lcPart2Content: 'Play the Organizational Accomplishments video for September.',
			lcCBS: 'lff lesson 56 and endnotes 6 and 7',
			songConclude: 101,
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
			weekDate: '4-10 de septiembre',
			weeklyBibleReading: 'ESTER 1, 2',
			songFirst: 137,
			tgwTalk: '“Esfuércese por ser modesto como Ester” (10 mins.)',
			tgwBRead: 'Lectura de la Biblia (4 mins.): Est 1:13-22 (th lec. 10).',
			ayfCount: 3,
			ayfPart1:
				'Video de la primera conversación (5 mins.): Análisis con el auditorio. Ponga el video Primera conversación: El Reino (Mt 6:9, 10). Detenga el video en cada pausa y haga las preguntas que aparecen en él.',
			ayfPart2:
				'Primera conversación (3 mins.): Use el tema de las ideas para conversar. Luego ofrezca el folleto Disfrute de la vida (th lec. 1).',
			ayfPart3: 'Discurso (5 mins.): w20.11 12-14 párrs. 3-7. Título: Jesús y los ángeles nos ayudan (th lec. 14).',
			songMiddle: 106,
			lcCount: 2,
			lcPart1:
				'Lo que opinan otros jóvenes: La apariencia (5 mins.): Análisis con el auditorio. Ponga el video. Luego pregunte: ¿por qué puede ser difícil mantener una actitud equilibrada sobre nuestra apariencia física?',
			lcPart2:
				'Logros de la organización (10 mins.): Ponga el video Logros de la organización para el mes de septiembre.',
			lcCBS: 'Estudio bíblico de la congregación (30 mins.): lff lección 56 y notas 6 y 7.',
			songConclude: 101,
		},
    		...
  	]
}
```
