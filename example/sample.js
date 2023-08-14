import { loadEPUB } from '../src/node/index.js';

const JW_CDN = 'https://app.jw-cdn.org/apis/pub-media/GETPUBMEDIALINKS?';
const JW_FINDER = 'https://www.jw.org/finder?';
const WOL_CDN = 'https://b.jw-cdn.org/apis/wol-link/';
const WOL_E = 'https://wol.jw.org/wol/dt/r1/lp-e';

const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

const fetchIssueData = async (issue, pub) => {
	try {
		if (issue.hasEPUB) {
			const epubFile = issue.hasEPUB[0].file;
			const epubUrl = epubFile.url;

			const epubData = await loadEPUB({ url: epubUrl });
			return epubData;
		}

		if (!issue.hasEPUB) {
			const language = issue.language;

			const parser = new window.DOMParser();

			if (pub === 'mwb') {
				const url =
					JW_FINDER +
					new URLSearchParams({
						wtlocale: language,
						pub,
						issue: issue.issueDate,
					});

				const res = await fetch(url);
				const result = await res.text();

				const htmlItem = parser.parseFromString(result, 'text/html');

				const docIds = [];
				const accordionItems = htmlItem.getElementsByClassName(`docClass-106 iss-${issue.issueDate}`);
				for (const weekLink of accordionItems) {
					weekLink.classList.forEach((item) => {
						if (item.indexOf('docId-') !== -1) {
							docIds.push(item.split('-')[1]);
						}
					});
				}

				const htmlRaws = [];

				const fetchSchedule1 = fetch(`https://www.jw.org/finder?wtlocale=${language}&docid=${docIds[0]}`).then((res) =>
					res.text()
				);
				const fetchSchedule2 = fetch(`https://www.jw.org/finder?wtlocale=${language}&docid=${docIds[1]}`).then((res) =>
					res.text()
				);
				const fetchSchedule3 = fetch(`https://www.jw.org/finder?wtlocale=${language}&docid=${docIds[2]}`).then((res) =>
					res.text()
				);
				const fetchSchedule4 = fetch(`https://www.jw.org/finder?wtlocale=${language}&docid=${docIds[3]}`).then((res) =>
					res.text()
				);
				const fetchSchedule5 = fetch(`https://www.jw.org/finder?wtlocale=${language}&docid=${docIds[4]}`).then((res) =>
					res.text()
				);
				const fetchSchedule6 = fetch(`https://www.jw.org/finder?wtlocale=${language}&docid=${docIds[5]}`).then((res) =>
					res.text()
				);
				const fetchSchedule7 = fetch(`https://www.jw.org/finder?wtlocale=${language}&docid=${docIds[6]}`).then((res) =>
					res.text()
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

				const raws = await Promise.all([
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

				for (let z = 0; z < raws.length; z++) {
					const rawText = raws[z];
					if (rawText !== '') {
						htmlRaws.push(rawText);
					}
				}

				const epubData = await loadEPUB({ htmlRaws, epubYear: issue.currentYear, epubLang: language, isMWB: true });
				return epubData;
			}
		}
	} catch (err) {
		throw new Error(err);
	}
};

export const fetchData = async (language, issue, pub) => {
	let data = [];

	if (!issue && !pub) {
		for await (const pub of ['mwb']) {
			const issues = [];

			if (pub === 'mwb') {
				let notFound = false;

				// get current issue
				const today = new Date();
				const day = today.getDay();
				const diff = today.getDate() - day + (day === 0 ? -6 : 1);
				const weekDate = new Date(today.setDate(diff));
				const validDate = weekDate.setMonth(weekDate.getMonth());

				const startDate = new Date(validDate);
				const currentMonth = startDate.getMonth() + 1;
				const monthOdd = currentMonth % 2 === 0 ? false : true;
				let monthMwb = monthOdd ? currentMonth : currentMonth - 1;
				let currentYear = startDate.getFullYear();

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

					if (res.status === 200) {
						const result = await res.json();
						const hasEPUB = result.files[language].EPUB;

						issues.push({ issueDate, currentYear, language, hasEPUB: hasEPUB });
					}

					if (res.status === 404) {
						notFound = true;
					}

					// assigning next issue
					monthMwb = monthMwb + 2;
					if (monthMwb === 13) {
						monthMwb = 1;
						currentYear++;
					}
				} while (notFound === false);
			}

			if (issues.length > 0) {
				const fetchSource1 = fetchIssueData(issues[0], pub);
				const fetchSource2 = issues.length > 1 ? fetchIssueData(issues[1], pub) : Promise.resolve(undefined);
				const fetchSource3 = issues.length > 2 ? fetchIssueData(issues[2], pub) : Promise.resolve(undefined);
				const fetchSource4 = issues.length > 3 ? fetchIssueData(issues[3], pub) : Promise.resolve(undefined);
				const fetchSource5 = issues.length > 4 ? fetchIssueData(issues[4], pub) : Promise.resolve(undefined);
				const fetchSource6 = issues.length > 5 ? fetchIssueData(issues[5], pub) : Promise.resolve(undefined);
				const fetchSource7 = issues.length > 6 ? fetchIssueData(issues[6], pub) : Promise.resolve(undefined);

				const allData = await Promise.all([
					fetchSource1,
					fetchSource2,
					fetchSource3,
					fetchSource4,
					fetchSource5,
					fetchSource6,
					fetchSource7,
				]);

				for (let z = 0; z < allData.length; z++) {
					const tempObj = allData[z];
					if (tempObj) {
						data.push(tempObj);
					}
				}
			}
		}
	}

	if (issue && pub) {
		const url = JW_CDN + new URLSearchParams({ langwritten: language, pub, output: 'json', issue });

		const res = await fetch(url);

		if (res.status === 200) {
			const result = await res.json();
			const hasEPUB = result.files[language].EPUB;

			const issueFetch = { issueDate: issue, currentYear: issue.substring(0, 4), language, hasEPUB: hasEPUB };

			data = await fetchIssueData(issueFetch, pub);
		}
	}

	return data;
};
