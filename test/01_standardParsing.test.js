import fs from 'fs';
import * as path from 'path';
import fetch from 'node-fetch';
import { expect } from 'chai';
import { loadEPUB } from '../dist/node/index.js';

const list = JSON.parse(await fs.promises.readFile(new URL('./standardParsing/list.json', import.meta.url)));
const JW_CDN = 'https://app.jw-cdn.org/apis/pub-media/GETPUBMEDIALINKS?';

const fetchData = async (language, issue) => {
	let data = [];
	let fixture = [];

	const url =
		JW_CDN +
		new URLSearchParams({
			langwritten: language,
			pub: 'mwb',
			output: 'json',
			issue,
		});

	const res = await fetch(url);

	if (res.status === 200) {
		const result = await res.json();
		const hasEPUB = result.files[language].EPUB;

		if (hasEPUB) {
			const epubFile = hasEPUB[0].file;
			const epubUrl = epubFile.url;
			const epubName = path.basename(epubUrl);
			data = await loadEPUB({ url: epubUrl });
			fixture = (await import(`./fixtures/${epubName.replace('.epub', '.js')}`)).default;
		}

		if (!hasEPUB) {
			const url =
				JW_FINDER +
				new URLSearchParams({
					wtlocale: language,
					pub: 'mwb',
					issue,
				});

			const res = await fetch(url);
			const result = await res.text();

			const parser = new window.DOMParser();
			const htmlItem = parser.parseFromString(result, 'text/html');

			const docIds = [];
			const accordionItems = htmlItem.getElementsByClassName('docClass-106');
			for (const weekLink of accordionItems) {
				weekLink.classList.forEach((item) => {
					if (item.indexOf('docId-') !== -1) {
						docIds.push(item.split('-')[1]);
					}
				});
			}

			const htmlDocs = [];
			for (let z = 0; z < docIds.length; z++) {
				const docId = docIds[z];
				const finderLink = `https://www.jw.org/finder?wtlocale=${language}&docid=${docId}`;
				const res2 = await fetch(finderLink);
				const result2 = await res2.text();

				const parser = new window.DOMParser();
				const htmlItem = parser.parseFromString(result2, 'text/html');
				htmlDocs.push(htmlItem);
			}

			data = await loadEPUB({ htmlDocs, mwbYear: issue.substring(0, 4), lang: language });
			fixture = (await import(`./fixtures/mwb_${language}_${issue}.js`)).default;
		}
	}

	return { data, fixture };
};

describe('Triggered standard parsing', () => {
	for (let i = 0; i < list.length; i++) {
		const { language, issue } = list[i];

		it(`Test loadEPUB function with standard parsing for ${language} language`, async () => {
			const { data, fixture } = await fetchData(language, issue);

			expect(data.mwbYear).to.equal(fixture.mwbYear);
			expect(data.weeksCount).to.equal(fixture.weeksCount);
			for (let a = 0; a < fixture.weeksData.length; a++) {
				const week = fixture.weeksData[a];
				for (let [key, value] of Object.entries(week)) {
					expect(data.weeksData[a]).to.have.property(key).equal(value);
				}
			}
		});
	}
});
