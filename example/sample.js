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

			if (pub === 'w') {
				const url = `${WOL_CDN}${language}/pi-w_${issue.issueDate}`;
				let res = await fetch(url);
				let result = await res.json();

				if (Array.isArray(result)) {
					return [];
				}

				if (result.url) {
					res = await fetch(result.url);
					result = await res.text();

					let htmlItem = parser.parseFromString(result, 'text/html');

					const tocWT = htmlItem.querySelector('#materialNav').querySelector('ul');
					const tocWTLinks = tocWT.querySelectorAll('li');
					const tocWTLink = 'https://wol.jw.org' + tocWTLinks[1].querySelector('a').getAttribute('href');

					res = await fetch(tocWTLink);
					result = await res.text();

					htmlItem = parser.parseFromString(result, 'text/html');

					const urls = [];
					const studyArticles = htmlItem.querySelector('.groupTOC').querySelectorAll('h3');
					for (const article of studyArticles) {
						const articleLink = article.nextElementSibling.querySelector('a').getAttribute('href');
						urls.push(`https://wol.jw.org${articleLink}`);
					}

					const htmlArticles = [];

					const fetchArticle1 = fetch(urls[0]).then((res) => res.text());
					const fetchArticle2 = fetch(urls[1]).then((res) => res.text());
					const fetchArticle3 = fetch(urls[2]).then((res) => res.text());
					const fetchArticle4 = fetch(urls[3]).then((res) => res.text());
					const fetchArticle5 = urls[4] ? fetch(urls[4]).then((res) => res.text()) : Promise.resolve('');

					const raws = await Promise.all([fetchArticle1, fetchArticle2, fetchArticle3, fetchArticle4, fetchArticle5]);

					for (let z = 0; z < raws.length; z++) {
						const rawText = raws[z];
						if (rawText !== '') {
							htmlArticles.push(rawText);
						}
					}

					const epubData = await loadEPUB({
						htmlRaws: [result],
						epubYear: issue.currentYear,
						epubLang: language,
						isW: true,
						htmlArticles,
					});

					return epubData;
				}
			}
		}
	} catch (err) {
		throw new Error(err);
	}
};

export const fetchData = async (language, issue, pub) => {
	let data = [];

	if (!issue && !pub) {
		for await (const pub of ['mwb', 'w']) {
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

			if (pub === 'w') {
				let notFound = false;

				// get w current issue
				const today = new Date();
				const url = `${WOL_E}/${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`;

				const res = await fetch(url);
				const data = await res.json();

				const wData = data.items.find((item) => item.classification === 68);
				const publicationTitle = wData.publicationTitle;

				const findYear = /\b\d{4}\b/;
				const array = findYear.exec(publicationTitle);
				let currentYear = +array[0];

				const monthsRegex = `(${months.join('|')})`;

				const regex = new RegExp(monthsRegex);
				const array2 = regex.exec(publicationTitle);

				let monthW = months.findIndex((month) => month === array2[0]) + 1;

				do {
					const issueDate = currentYear + String(monthW).padStart(2, '0');
					const url =
						JW_CDN +
						new URLSearchParams({
							langwritten: language,
							pub,
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
					monthW = monthW + 1;
					if (monthW === 13) {
						monthW = 1;
						currentYear++;
					}
				} while (notFound === false);
			}

			if (issues.length > 0) {
				const fetchSource1 = fetchIssueData(issues[0], pub);
				const fetchSource2 = issues.length > 1 ? fetchIssueData(issues[1], pub) : Promise.resolve([]);
				const fetchSource3 = issues.length > 2 ? fetchIssueData(issues[2], pub) : Promise.resolve([]);
				const fetchSource4 = issues.length > 3 ? fetchIssueData(issues[3], pub) : Promise.resolve([]);
				const fetchSource5 = issues.length > 4 ? fetchIssueData(issues[4], pub) : Promise.resolve([]);
				const fetchSource6 = issues.length > 5 ? fetchIssueData(issues[5], pub) : Promise.resolve([]);
				const fetchSource7 = issues.length > 6 ? fetchIssueData(issues[6], pub) : Promise.resolve([]);

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
					if (tempObj.length > 0) {
						for (const src of tempObj) {
							const date = src.mwb_week_date || src.w_study_date;

							const prevSrc = data.find((item) => item.mwb_week_date === date || item.w_study_date === date);

							if (prevSrc) {
								Object.assign(prevSrc, src);
							}

							if (!prevSrc) {
								data.push(src);
							}
						}
					}
				}
			}
		}

		for (const src of data) {
			if (src.mwb_week_date) {
				src.week_date = src.mwb_week_date;
				delete src.mwb_week_date;
			}

			if (src.w_study_date) {
				src.week_date = src.w_study_date;
				delete src.w_study_date;
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
