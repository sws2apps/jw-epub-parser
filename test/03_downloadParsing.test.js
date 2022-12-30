import fs from 'fs';
import fetch from 'node-fetch';
import { expect } from 'chai';
import { loadEPUB } from '../dist/node/index.js';

const list = JSON.parse(await fs.promises.readFile(new URL('./enhancedParsing/list.json', import.meta.url)));

const JW_CDN = 'https://app.jw-cdn.org/apis/pub-media/GETPUBMEDIALINKS?';

for (let i = 0; i < list.length; i++) {
	const { language } = list[i];

	describe(`Test loadEPUB function with live data from jw.org for ${language} language`, () => {
		it(`should return an array with length above 0`, async () => {
			// get current issue
			const today = new Date();
			const day = today.getDay();
			const diff = today.getDate() - day + (day === 0 ? -6 : 1);
			const weekDate = new Date(today.setDate(diff));
			const currentMonth = weekDate.getMonth() + 1;
			const monthOdd = currentMonth % 2 === 0 ? false : true;
			let monthMwb = monthOdd ? currentMonth : currentMonth - 1;
			let currentYear = weekDate.getFullYear();

			let notFound = false;
			const mergedSources = [];

			do {
				const issueDate = currentYear + String(monthMwb).padStart(2, '0');
				const url =
					JW_CDN +
					new URLSearchParams({
						langwritten: language,
						pub: 'mwb',
						fileformat: 'epub',
						output: 'json',
						issue: issueDate,
					});

				const res = await fetch(url);
				if (res.status === 404) {
					notFound = true;
				} else {
					const data = await res.json();
					const epubFile = data.files[language].EPUB[0].file;
					const epubUrl = epubFile.url;
					const epubModifiedDate = epubFile.modifiedDatetime;

					const epubData = await loadEPUB({ url: epubUrl });
					const obj = {
						issueDate,
						modifiedDateTime: epubModifiedDate,
						...epubData,
					};

					mergedSources.push(obj);

					// assigning next issue
					monthMwb = monthMwb + 2;
					if (monthMwb === 13) {
						monthMwb = 1;
						currentYear++;
					}
				}
			} while (notFound === false);

			expect(mergedSources).to.be.an('array').to.have.lengthOf.above(0);
		});
	});
}
