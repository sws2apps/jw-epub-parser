import fs from 'fs';
import * as path from 'path';
import fetch from 'node-fetch';
import { expect } from 'chai';
import { loadEPUB } from '../dist/node/index.js';

const list = JSON.parse(await fs.promises.readFile(new URL('./enhancedParsing/list.json', import.meta.url)));

const JW_CDN = 'https://app.jw-cdn.org/apis/pub-media/GETPUBMEDIALINKS?';
const JW_FINDER = 'https://www.jw.org/finder?';

const fetchIssueData = (issue) => {
	return new Promise((resolve) => {
		if (issue.hasEPUB) {
			const epubFile = issue.hasEPUB[0].file;
			const epubUrl = epubFile.url;
			const epubModifiedDate = epubFile.modifiedDatetime;

			loadEPUB({ url: epubUrl }).then((epubData) => {
				const obj = {
					issueDate: issue.issueDate,
					modifiedDateTime: epubModifiedDate,
					...epubData,
				};
				resolve(obj);
			});
		}

		if (!issue.hasEPUB) {
			return [];
		}
	});
};

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

		const issueFetch = { issueDate: issue, currentYear: issue.substring(0, 4), language, hasEPUB: hasEPUB };

		data = await Promise.resolve(fetchIssueData(issueFetch));

		if (hasEPUB) {
			const epubFile = hasEPUB[0].file;
			const epubUrl = epubFile.url;
			const epubName = path.basename(epubUrl);
			fixture = (await import(`./fixtures/${epubName.replace('.epub', '.js')}`)).default;
		}

		if (!hasEPUB) {
			fixture = (await import(`./fixtures/mwb_${language}_${issue}.js`)).default;
		}
	}

	return { data, fixture };
};

describe('Triggered enhanced parsing', async () => {
	for (let i = 0; i < list.length; i++) {
		const { language, issue } = list[i];

		it(`Test loadEPUB function with enhanced parsing for ${language} language`, async () => {
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
