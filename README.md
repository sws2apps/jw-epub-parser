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

| Name               |       Type        | Description                                                                                                                     |
| ------------------ | :---------------: | ------------------------------------------------------------------------------------------------------------------------------- |
| weekDate           |      string       | Week date. For enhanced parsing, it is formatted as `mm/dd/yyyy`                                                                |
| weekDateLocale\*   |      string       | Week date                                                                                                                       |
| weeklyBibleReading |      string       | Weekly Bible Reading                                                                                                            |
| songFirst          |      integer      | First song                                                                                                                      |
| tgw10Talk          |      string       | 10 min talk title of the Treasures from God’s Word                                                                              |
| tgwBRead           |      string       | Bible Reading for student                                                                                                       |
| tgwBReadStudy\*    |      integer      | Study Point for Bible Reading part                                                                                              |
| ayfCount           |      integer      | Number of parts in Apply Yourself to the Field Ministry                                                                         |
| ayfPart1           |      string       | Part 1 in Apply Yourself to the Field Ministry                                                                                  |
| ayfPart1Time\*     |      integer      | Timing of Part 1 in Apply Yourself to the Field Ministry                                                                        |
| ayfPart1Type\*     |      string       | Type of Part 1 in Apply Yourself to the Field Ministry                                                                          |
| ayfPart1Study\*    |      integer      | Study Point of Part 1 in Apply Yourself to the Field Ministry                                                                   |
| ayfPart2           |      string       | Part 2 in Apply Yourself to the Field Ministry. This property will not be available if `ayfCount` is 1                          |
| ayfPart2Time\*     |      integer      | Timing of Part 2 in Apply Yourself to the Field Ministry. This property will not be available if `ayfCount` is 1                |
| ayfPart2Type\*     |      string       | Type of Part 2 in Apply Yourself to the Field Ministry. This property will not be available if `ayfCount` is 1                  |
| ayfPart2Study\*    |      integer      | Study Point of Part 2 in Apply Yourself to the Field Ministry. This property will not be available if `ayfCount` is 1           |
| ayfPart3           |      string       | Part 3 in Apply Yourself to the Field Ministry. This property will not be available if `ayfCount` is less than 3                |
| ayfPart3Time\*     |      integer      | Timing of Part 3 in Apply Yourself to the Field Ministry. This property will not be available if `ayfCount` is less than 3      |
| ayfPart3Type\*     |      string       | Type of Part 3 in Apply Yourself to the Field Ministry. This property will not be available if `ayfCount` is less than 3        |
| ayfPart3Study\*    |      integer      | Study Point of Part 3 in Apply Yourself to the Field Ministry. This property will not be available if `ayfCount` is less than 3 |
| ayfPart4           |      string       | Part 4 in Apply Yourself to the Field Ministry. This property will not be available if `ayfCount` is less than 4                |
| ayfPart4Time\*     |      integer      | Timing of Part 4 in Apply Yourself to the Field Ministry. This property will not be available if `ayfCount` is less than 4      |
| ayfPart4Type\*     |      string       | Type of Part 4 in Apply Yourself to the Field Ministry. This property will not be available if `ayfCount` is less than 4        |
| ayfPart4Study\*    |      integer      | Study Point of Part 4 in Apply Yourself to the Field Ministry. This property will not be available if `ayfCount` is less than 4 |
| songMiddle         |      integer      | Middle song                                                                                                                     |
| lcCount            |      integer      | Number of parts in Living as Christians                                                                                         |
| lcPart1            |      string       | Part 1 in Living as Christians                                                                                                  |
| lcPart1Time\*      |      integer      | Timing of Part 1 in Living as Christians                                                                                        |
| lcPart1Content\*   |      string       | Content of Part 1 in Living as Christians                                                                                       |
| lcPart2            |      string       | Part 2 in Living as Christians. This property will not be available if `lcCount` is 1                                           |
| lcPart2Time\*      |      integer      | Timing of Part 2 in Living as Christians. This property will not be available if `lcCount` is 1                                 |
| lcPart2Content\*   |      string       | Content of Part 2 in Living as Christians. This property will not be available if `lcCount` is 1                                |
| lcCBS              |      string       | Congregation Bible Study source material                                                                                        |
| songConclude       | integer or string | Concluding song. When the song number is out of range, it will be the default text from the Meeting Workbook.                   |

\* These properties are only available when enhanced parsing is available for the language you want to parse.

Currently, we only support enhanced parsing for the following languages:

Enlish (E), French (F), Malagasy (MG), Tandroy (TND), Tankarana (TND), Vezo (VZ)

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
			weekDate: '03/06/2023',
			weekDateLocale: 'March 6-12',
			weeklyBibleReading: '1 CHRONICLES 23-26',
			songFirst: 123,
			tgw10Talk: '“Temple Worship Becomes Highly Organized”',
			tgwBRead: '1Ch 23:21-32',
			tgwBReadStudy: 5,
			ayfCount: 3,
			ayfPart1:
				'Discussion. Play the video Memorial Invitation Campaign. Stop the video at each pause, and ask the audience the questions that appear in the video.',
			ayfPart1Time: 5,
			ayfPart1Type: 'Memorial Invitation Video',
			ayfPart2:
				'Begin with the sample conversation topic. After the householder expresses interest, introduce and discuss (but do not play) the video Remember Jesus’ Death.',
			ayfPart2Time: 3,
			ayfPart2Type: 'Memorial Invitation',
			ayfPart2Study: 11,
			ayfPart3: 'w11 6/1 14-15​—Theme: Why Are Christians Organized?',
			ayfPart3Time: 5,
			ayfPart3Type: 'Talk',
			ayfPart3Study: 14,
			songMiddle: 101,
			lcCount: 2,
			lcPart1: '“How to Help After a Disaster”',
			lcPart1Time: 10,
			lcPart1Content: 'Discussion and video.',
			lcPart2: 'Memorial Campaign to Begin Saturday, March 11',
			lcPart2Time: 5,
			lcPart2Content:
				'Discussion. Briefly review the invitation. Outline the local arrangements for the special talk and the Memorial and for covering the territory.',
			lcCBS: 'lff lesson 39 and endnote 3',
			songConclude: 127,
		},
		{
			weekDate: '03/13/2023',
			weekDateLocale: 'March 13-19',
			weeklyBibleReading: '1 CHRONICLES 27-29',
			songFirst: 133,
			tgw10Talk: '“A Father’s Loving Admonition to His Son”',
			tgwBRead: '1Ch 27:1-15',
			tgwBReadStudy: 10,
			ayfCount: 3,
			ayfPart1:
				'Discussion. Play the video Return Visit: Jesus​—Mt 20:28. Stop the video at each pause, and ask the audience the questions that appear in the video.',
			ayfPart1Time: 5,
			ayfPart1Type: 'Return Visit Video',
			ayfPart2:
				'Make a return visit on someone who accepted the Memorial invitation and showed interest. Introduce and discuss (but do not play) Why Did Jesus Die?',
			ayfPart2Time: 4,
			ayfPart2Type: 'Return Visit',
			ayfPart2Study: 9,
			ayfPart3:
				'Make a return visit on someone who accepted the Memorial invitation and showed interest. Start a Bible study in the Enjoy Life Forever! brochure.',
			ayfPart3Time: 4,
			ayfPart3Type: 'Return Visit',
			ayfPart3Study: 6,
			songMiddle: 4,
			lcCount: 2,
			lcPart1: 'Local Needs',
			lcPart1Time: 5,
			lcPart2: 'Organizational Accomplishments',
			lcPart2Time: 10,
			lcPart2Content: 'Play the Organizational Accomplishments video for March.',
			lcCBS: 'lff lesson 40',
			songConclude: 45,
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
			weekDate: '6-12 de marzo',
			weeklyBibleReading: '1 CRÓNICAS 23-26',
			songFirst: 123,
			tgw10Talk: '“La adoración en el templo estaba bien organizada” (10 mins.)',
			tgwBRead: 'Lectura de la Biblia (4 mins.): 1Cr 23:21-32 (th lec. 5).',
			ayfCount: 3,
			ayfPart1:
				'Video de la invitación a la Conmemoración (5 mins.): Análisis con el auditorio. Ponga el video Campaña de la Conmemoración. Detenga el video en cada pausa y haga las preguntas que aparecen en él.',
			ayfPart2:
				'Invitación a la Conmemoración (3 mins.): Use el tema de las ideas para conversar. Luego, cuando la persona muestre interés, presente y analice el video Recordemos la muerte de Jesús, pero no lo ponga (th lec. 11).',
			ayfPart3: 'Discurso (5 mins.): w11 1/6 14, 15. Título: ¿Por qué están los cristianos bien organizados? (th lec. 14).',
			songMiddle: 101,
			lcCount: 2,
			lcPart1: '“Cómo podemos ayudar cuando ocurre un desastre” (10 mins.): Análisis con el auditorio y video.',
			lcPart2:
				'El 11 de marzo comienza la campaña de la Conmemoración (5 mins.): Análisis con el auditorio. Repase brevemente el contenido de la invitación. Explique los planes que se han hecho para el discurso especial, para celebrar la Conmemoración y para cubrir el territorio.',
			lcCBS: 'Estudio bíblico de la congregación (30 mins.): lff lección 39 y nota 3.',
			songConclude: 127,
		},
		{
			weekDate: '13-19 de marzo',
			weeklyBibleReading: '1 CRÓNICAS 27-29',
			songFirst: 133,
			tgw10Talk: '“Los buenos consejos de un padre que amaba a su hijo” (10 mins.)',
			tgwBRead: 'Lectura de la Biblia (4 mins.): 1Cr 27:1-15 (th lec. 10).',
			ayfCount: 3,
			ayfPart1:
				'Video de la revisita (5 mins.): Análisis con el auditorio. Ponga el video Revisita: Jesús (Mt 20:28). Detenga el video en cada pausa y haga las preguntas que aparecen en él.',
			ayfPart2:
				'Revisita (4 mins.): Vuelva a visitar a alguien que haya aceptado una invitación a la Conmemoración y que haya mostrado interés. Presente y analice el video ¿Por qué murió Jesús?, pero no lo ponga (th lec. 9).',
			ayfPart3:
				'Revisita (4 mins.): Vuelva a visitar a alguien que haya aceptado una invitación a la Conmemoración y que haya mostrado interés. Comience un curso bíblico utilizando el folleto Disfrute de la vida (th lec. 6).',
			songMiddle: 4,
			lcCount: 2,
			lcPart1: 'Necesidades de la congregación (5 mins.)',
			lcPart2: 'Logros de la organización (10 mins.): Ponga el video Logros de la organización para el mes de marzo.',
			lcCBS: 'Estudio bíblico de la congregación (30 mins.): lff lección 40.',
			songConclude: 45,
		},
    ...
  ]
}
```
