import fs from 'fs';
import * as path from 'path';
import { expect } from 'chai';
import { loadEPUB } from '../dist/node/index.js';

const list = JSON.parse(await fs.promises.readFile(new URL('./enhancedParsing/list.json', import.meta.url)));

const JW_CDN = 'https://app.jw-cdn.org/apis/pub-media/GETPUBMEDIALINKS?';

const fetchIssueData = async (issue, pub) => {
	try {
		if (issue.hasEPUB) {
			const epubFile = issue.hasEPUB[0].file;
			const epubUrl = epubFile.url;

			const epubData = await loadEPUB({ url: epubUrl });
			return epubData;
		}

		if (!issue.hasEPUB) {
			return [];
		}
	} catch (err) {
		throw new Error(err);
	}
};

const fetchData = async (language, issue, pub) => {
	let data = [];
	let fixture = [];

	const url =
		JW_CDN +
		new URLSearchParams({
			langwritten: language,
			pub,
			output: 'json',
			issue,
		});

	const res = await fetch(url);

	if (res.status === 200) {
		const result = await res.json();
		const hasEPUB = result.files[language].EPUB;

		const issueFetch = { issueDate: issue, currentYear: issue.substring(0, 4), language, hasEPUB: hasEPUB };

		data = await fetchIssueData(issueFetch, pub);

		if (hasEPUB) {
			const epubFile = hasEPUB[0].file;
			const epubUrl = epubFile.url;
			const epubName = path.basename(epubUrl);
			fixture = (await import(`./fixtures/${epubName.replace('.epub', '.js')}`)).default;
		}

		if (!hasEPUB) {
			fixture = (await import(`./fixtures/${pub}_${language}_${issue}.js`)).default;
		}
	}

	return { data, fixture };
};

describe('Testing Enhanced Parsing', async () => {
	for (let i = 0; i < list.length; i++) {
		const { language, issue } = list[i];

		describe(`Test loadEPUB function for ${language} language`, async () => {
			it(`Parsing Meeting Workbook EPUB file`, async () => {
				const { data, fixture } = await fetchData(language, issue, 'mwb');

				for (let a = 0; a < fixture.length; a++) {
					const week = fixture[a];
					for (let [key, value] of Object.entries(week)) {
						expect(data[a]).to.have.property(key).equal(value);
					}
				}
			});

			it(`Parsing Watchtower Study EPUB file`, async () => {
				const { data, fixture } = await fetchData(language, issue, 'w');

				for (let a = 0; a < fixture.length; a++) {
					const week = fixture[a];
					for (let [key, value] of Object.entries(week)) {
						expect(data[a]).to.have.property(key).equal(value);
					}
				}
			});
		});
	}
});
