import fs from 'fs';
import * as path from 'path';
import fetch from 'node-fetch';
import { expect } from 'chai';
import { loadEPUB } from '../dist/node/index.js';

const list = JSON.parse(await fs.promises.readFile(new URL('./standardParsing/list.json', import.meta.url)));

const JW_CDN = 'https://app.jw-cdn.org/apis/pub-media/GETPUBMEDIALINKS?';

for (let i = 0; i < list.length; i++) {
	const { language, issue } = list[i];

	console.log(`Downloading EPUB file for ${language} language (issue date: ${issue})`);

	const url =
		JW_CDN +
		new URLSearchParams({
			langwritten: language,
			pub: 'mwb',
			fileformat: 'epub',
			output: 'json',
			issue,
		});

	const res = await fetch(url);
	const result = await res.json();
	const epubFile = result.files[language].EPUB[0].file;
	const epubUrl = epubFile.url;
	const epubName = path.basename(epubUrl);
	const data = await loadEPUB({ url: epubUrl });
	const fixture = (await import(`./fixtures/${epubName.replace('.epub', '.js')}`)).default;

	console.log(`Download completed!`);

  describe(`Test loadEPUB function with standard parsing for ${epubName}`, () => {
    it(`mwbYear should return ${fixture.mwbYear}`, () => {
      expect(data.mwbYear).to.equal(fixture.mwbYear);
    });

    it(`weeksCount should return ${fixture.weeksCount}`, () => {
      expect(data.weeksCount).to.equal(fixture.weeksCount);
    });

    for (let a = 0; a < fixture.weeksData.length; a++) {
      const week = fixture.weeksData[a];

			it(`week no. ${a + 1} in weeksData should have and return the correct properties`, () => {
				for (let [key, value] of Object.entries(week)) {
					expect(data.weeksData[a]).to.have.property(key).equal(value);
				}
			});
		}
	});
}
