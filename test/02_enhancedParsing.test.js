import fs from 'fs';
import * as path from 'path';
import fetch from 'node-fetch';
import { expect } from 'chai';
import { loadEPUB } from '../dist/node/index.js';

const list = JSON.parse(await fs.promises.readFile(new URL('./enhancedParsing/list.json', import.meta.url)));

const JW_CDN = 'https://app.jw-cdn.org/apis/pub-media/GETPUBMEDIALINKS?';
const JW_FINDER = 'https://www.jw.org/finder?';

describe('Triggered enhanced parsing', () => {
	for (let i = 0; i < list.length; i++) {
		const { language, issue } = list[i];

		const fetchData = new Promise(async (resolve, reject) => {
			try {
				let fixture = [];
				let data = [];

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
				}

				resolve({ data, fixture });
			} catch (err) {
				reject(err);
			}
		});

		it(`Test loadEPUB function with enhanced parsing for ${language} language`, (done) => {
			fetchData.then((result) => {
				const { data, fixture } = result;

				expect(data.mwbYear).to.equal(fixture.mwbYear);
				expect(data.weeksCount).to.equal(fixture.weeksCount);
				for (let a = 0; a < fixture.weeksData.length; a++) {
					const week = fixture.weeksData[a];
					for (let [key, value] of Object.entries(week)) {
						expect(data.weeksData[a]).to.have.property(key).equal(value);
					}
				}
				done();
			});
		});
	}
});
