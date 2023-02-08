import fs from 'fs';
import fetch from 'node-fetch';
import { expect } from 'chai';
import { loadEPUB } from '../dist/node/index.js';

const list = JSON.parse(await fs.promises.readFile(new URL('./enhancedParsing/list.json', import.meta.url)));

const JW_CDN = 'https://app.jw-cdn.org/apis/pub-media/GETPUBMEDIALINKS?';

const fetchData = async (language) => {
	const mergedSources = [];
	let notFound = false;

	// get current issue
	const today = new Date();
	const day = today.getDay();
	const diff = today.getDate() - day + (day === 0 ? -6 : 1);
	const weekDate = new Date(today.setDate(diff));
	const currentMonth = weekDate.getMonth() + 1;
	const monthOdd = currentMonth % 2 === 0 ? false : true;
	let monthMwb = monthOdd ? currentMonth : currentMonth - 1;
	let currentYear = weekDate.getFullYear();

	do {
		const issueDate = currentYear + String(monthMwb).padStart(2, '0');
		const url =
			JW_CDN +
			new URLSearchParams({
				langwritten: language,
				pub: 'mwb',
				output: 'json',
				issue: issueDate,
			});

		const res = await fetch(url);

		if (res.status === 404) {
			notFound = true;
		} else {
			const result = await res.json();
			const epubEntry = result.files[language].EPUB;

			const epubFile = epubEntry[0].file;
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

	return mergedSources;
};

describe('Live download enhanced parsing', () => {
	for (let i = 0; i < list.length; i++) {
		const { language } = list[i];

		it(`Test live download from jw.org for ${language} language`, async () => {
			const mergedSources = await fetchData(language);
			expect(mergedSources).to.be.an('array').to.have.lengthOf.above(0);
		});
	}
});
