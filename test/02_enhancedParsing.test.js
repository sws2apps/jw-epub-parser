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
			const language = issue.language;

			const url =
				JW_FINDER +
				new URLSearchParams({
					wtlocale: language,
					pub: 'mwb',
					issue: issue.issueDate,
				});

			fetch(url).then((res) =>
				res.text().then((result) => {
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

					const htmlRaws = [];

					const fetchSchedule1 = fetch(`https://www.jw.org/finder?wtlocale=${language}&docid=${docIds[0]}`).then(
						(res) => res.text()
					);
					const fetchSchedule2 = fetch(`https://www.jw.org/finder?wtlocale=${language}&docid=${docIds[1]}`).then(
						(res) => res.text()
					);
					const fetchSchedule3 = fetch(`https://www.jw.org/finder?wtlocale=${language}&docid=${docIds[2]}`).then(
						(res) => res.text()
					);
					const fetchSchedule4 = fetch(`https://www.jw.org/finder?wtlocale=${language}&docid=${docIds[3]}`).then(
						(res) => res.text()
					);
					const fetchSchedule5 = fetch(`https://www.jw.org/finder?wtlocale=${language}&docid=${docIds[4]}`).then(
						(res) => res.text()
					);
					const fetchSchedule6 = fetch(`https://www.jw.org/finder?wtlocale=${language}&docid=${docIds[5]}`).then(
						(res) => res.text()
					);
					const fetchSchedule7 = fetch(`https://www.jw.org/finder?wtlocale=${language}&docid=${docIds[6]}`).then(
						(res) => res.text()
					);
					const fetchSchedule8 = docIds[7]
						? fetch(`https://www.jw.org/finder?wtlocale=${language}&docid=${docIds[7]}`).then((res) => res.text())
						: Promise.resolve('');
					const fetchSchedule9 = docIds[8]
						? fetch(`https://www.jw.org/finder?wtlocale=${language}&docid=${docIds[8]}`).then((res) => res.text())
						: Promise.resolve('');
					const fetchSchedule10 = docIds[9]
						? fetch(`https://www.jw.org/finder?wtlocale=${language}&docid=${docIds[9]}`).then((res) => res.text())
						: Promise.resolve('');

					const allData = Promise.all([
						fetchSchedule1,
						fetchSchedule2,
						fetchSchedule3,
						fetchSchedule4,
						fetchSchedule5,
						fetchSchedule6,
						fetchSchedule7,
						fetchSchedule8,
						fetchSchedule9,
						fetchSchedule10,
					]);

					allData.then((raws) => {
						for (let z = 0; z < raws.length; z++) {
							const rawText = raws[z];
							if (rawText !== '') {
								htmlRaws.push(rawText);
							}
						}

						loadEPUB({ htmlRaws, mwbYear: issue.currentYear, lang: language }).then((epubData) => {
							const obj = {
								issueDate: issue.issueDate,
								...epubData,
							};

							resolve(obj);
						});
					});
				})
			);
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
