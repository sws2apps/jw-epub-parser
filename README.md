# JW EPUB Parser

This tool is created to complement the Scheduling Workbox System (SWS) utilities. It will help to parse and extract the needed source materials from Meeting Workbook EPUB file. Support for parsing Watchtower Study will be added in future release.

## Install

```bash
npm i jw-epub-parser
```

## Usage

```js
import loadEPUB from 'jw-epub-parser';

const epubJW = await loadEPUB('/path/to/file.epub');

console.log('epub schedule content:', epubJW);
```

### loadEPUB(epubData)

function: asynchronous

#### epubData

type: `string` or `buffer`

It can be the path to the EPUB file or EPUB file's binary string or buffer

## Return

By invoking the `loadEPUB` function, it will return an object which contains three properties:

| Return     |   Type  | Description |
| ---------- | :-----: | ----------- |
| mwbYear    | string  | The current year of the Meeting Workbook that is being parsed |
| weeksCount | integer | The number of weeks available in the EPUB file |
| weeksData  | array   | Array containing the weekly source material. Each property available for each object is available below |

Here are the list of all available properties in each object in the `weeksData` array:

| Name               |  Type   | Description |
| ------------------ | :-----: | ----------- |
| weekDate           | string  | Week date |
| weeklyBibleReading | string  | Weekly Bible Reading |
| songFirst          | string  | First song |
| tgw10Talk          | string  | 10 min talk title of the Treasures from God’s Word |
| tgwBRead           | string  | Bible Reading for student |
| ayfCount           | integer | Number of Apply Yourself to the Field Ministry parts |
| ayfPart1           | string  | Part 1 in Apply Yourself to the Field Ministry |
| ayfPart2           | string  | Part 2 in Apply Yourself to the Field Ministry. This property will not be available if the `ayfCount` is 1 |
| ayfPart3           | string  | Part 3 in Apply Yourself to the Field Ministry. This property will not be available if the `ayfCount` is less than 3 |
| ayfPart4           | string  | Part 4 in Apply Yourself to the Field Ministry. This property will not be available if the `ayfCount` is less than 4 |
| songMiddle         | string  | Middle song |
| lcCount            | integer | Number of Living as Christians parts |
| lcPart1            | string  | Part 1 in Living as Christians |
| lcPart2            | string  | Part 2 in Living as Christians. This property will not be available if the `lcCount` is 1 |
| lcCBS              | string  | Congregation Bible Study source material |
| songConclude       | string  | Concluding song |

You may then use your own method to take those outputs and convert them according to your needs: for example, you may add additional parsing to get the timing of the students parts, the type of the assignments, ...

## Sample Output

```js
{
  mwbYear: '2021',
  weeksCount: 9,
  weeksData: [
    {
      weekDate: '1-7 Novambra',
      weeklyBibleReading: 'JOSOA 18-19',
      songFirst: '12',
      tgw10Talk: '“Hita Amin’ny Fomba Nizaran’i Jehovah An’ilay Tany hoe Hendry Izy”: (10 min.)',
      tgwBRead: 'Famakiana Baiboly: (4 min.) Js 18:1-14 (th lesona 2)',
      ayfCount: 3,
      ayfPart1: 'Video Fitoriana: (5 min.) Fiaraha-midinika. Alefaso ilay video hoe Fitoriana: Vaovao Tsara—Sl 37:10, 11. Ajanòny ilay video isaky ny misy fiatoana, ary iaraho midinika ny fanontaniana mipoitra eo.',
      ayfPart2: 'Fitoriana: (4 min.) Atombohy amin’ilay hevitra azo resahina. Atolory Ny Tilikambo Fiambenana No. 2 2021. (th lesona 1)',
      ayfPart3: 'Fitoriana: (4 min.) Atombohy amin’ilay hevitra azo resahina. Miezaha mamaly fanoherana fahita eny amin’ny faritany. (th lesona 11)',
      songMiddle: '76',
      lcCount: 1,
      lcPart1: '“Misaotra An’i Jehovah Izahay Noho ny Fitiavanareo”: (15 min.) Fiaraha-midinika ataon’ny anti-panahy. Alefaso ilay video hoe “Misaotra An’Andriamanitra Mandrakariva Noho ny Aminareo Izahay.” Miresaha hevitra mahaliana iray na roa ao amin’ilay andian-dahatsoratra ao amin’ny jw.org hoe “Fomba Ampiasana ny Fanomezanao.”',
      lcCBS: 'Fianarana Baiboly: (30 min.) lv toko 16 § 15-22, efajoro “Tena Herin’ny Maizina ve Izany”',
      songConclude: '36'
    },
    {
      weekDate: '8-14 Novambra',
      weeklyBibleReading: 'JOSOA 20-22',
      songFirst: '120',
      tgw10Talk: '“Hevitra Tsy Nifankahazo”: (10 min.)',
      tgwBRead: 'Famakiana Baiboly: (4 min.) Js 20:1–21:3 (th lesona 5)',
      ayfCount: 3,
      ayfPart1: 'Video Fiverenana Mitsidika: (5 min.) Fiaraha-midinika. Alefaso ilay video hoe Fiverenana Mitsidika: Baiboly—Ap 21:3, 4. Ajanòny ilay video isaky ny misy fiatoana, ary iaraho midinika ny fanontaniana mipoitra eo.',
      ayfPart2: 'Fiverenana Mitsidika: (3 min.) Ampiasao ilay hevitra azo resahina. (th lesona 12)',
      ayfPart3: 'Fiverenana Mitsidika: (5 min.) Atombohy amin’ilay hevitra azo resahina. Atolory ilay bokikely hoe Ankafizo Mandrakizay ny Fiainana! (th lesona 14)',
      songMiddle: '119',
      lcCount: 1,
      lcPart1: 'Zavatra Ilain’ny Fiangonana: (15 min.)',
      lcCBS: 'Fianarana Baiboly: (30 min.) lv toko 17 § 1-10',
      songConclude: '118'
    },
    ...
  ]
}
```
