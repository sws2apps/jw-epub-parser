import fs from 'fs';
import fetch from 'node-fetch';
import { expect } from 'chai';
import { loadEPUB } from '../src/node/index.js';

const list = JSON.parse(await fs.promises.readFile(new URL('./enhancedParsing/list.json', import.meta.url)));

const JW_CDN = 'https://app.jw-cdn.org/apis/pub-media/GETPUBMEDIALINKS?';
const JW_FINDER = 'https://www.jw.org/finder?';
const WOL_CDN = 'https://b.jw-cdn.org/apis/wol-link/';

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

        if (result[0].status) {
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

const fetchData = async (language) => {
  let mergedSources = [];
  let notFound = false;

  // get mwb current issue
  const today = new Date();
  const day = today.getDay();
  const diff = today.getDate() - day + (day === 0 ? -6 : 1);
  let weekDate = new Date(today.setDate(diff));
  let currentMonth = weekDate.getMonth() + 1;
  const monthOdd = currentMonth % 2 === 0 ? false : true;
  let monthMwb = monthOdd ? currentMonth : currentMonth - 1;
  let currentYear = weekDate.getFullYear();

  const issues = [];

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

  if (issues.length > 0) {
    const fetchSource1 = fetchIssueData(issues[0], 'mwb');
    const fetchSource2 = issues.length > 1 ? fetchIssueData(issues[1], 'mwb') : Promise.resolve([]);
    const fetchSource3 = issues.length > 2 ? fetchIssueData(issues[2], 'mwb') : Promise.resolve([]);
    const fetchSource4 = issues.length > 3 ? fetchIssueData(issues[3], 'mwb') : Promise.resolve([]);
    const fetchSource5 = issues.length > 4 ? fetchIssueData(issues[4], 'mwb') : Promise.resolve([]);
    const fetchSource6 = issues.length > 5 ? fetchIssueData(issues[5], 'mwb') : Promise.resolve([]);
    const fetchSource7 = issues.length > 6 ? fetchIssueData(issues[6], 'mwb') : Promise.resolve([]);
    const fetchSource8 = issues.length > 7 ? fetchIssueData(issues[7], 'mwb') : Promise.resolve([]);
    const fetchSource9 = issues.length > 8 ? fetchIssueData(issues[8], 'mwb') : Promise.resolve([]);
    const fetchSource10 = issues.length > 9 ? fetchIssueData(issues[9], 'mwb') : Promise.resolve([]);
    const fetchSource11 = issues.length > 10 ? fetchIssueData(issues[10], 'mwb') : Promise.resolve([]);
    const fetchSource12 = issues.length > 11 ? fetchIssueData(issues[11], 'mwb') : Promise.resolve([]);

    const allData = await Promise.all([
      fetchSource1,
      fetchSource2,
      fetchSource3,
      fetchSource4,
      fetchSource5,
      fetchSource6,
      fetchSource7,
      fetchSource8,
      fetchSource9,
      fetchSource10,
      fetchSource11,
      fetchSource12,
    ]);

    for (let z = 0; z < allData.length; z++) {
      const tempObj = allData[z];
      if (tempObj.length > 0) {
        mergedSources = mergedSources.concat(tempObj);
      }
    }
  }

  // get w current issue
  weekDate = new Date(today.setMonth(today.getMonth() - 2));
  let monthW = weekDate.getMonth() + 1;
  currentYear = weekDate.getFullYear();

  issues.length = 0;
  notFound = false;

  do {
    const issueDate = currentYear + String(monthW).padStart(2, '0');
    const url =
      JW_CDN +
      new URLSearchParams({
        langwritten: language,
        pub: 'w',
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

  if (issues.length > 0) {
    const fetchSource1 = fetchIssueData(issues[0], 'w');
    const fetchSource2 = issues.length > 1 ? fetchIssueData(issues[1], 'w') : Promise.resolve([]);
    const fetchSource3 = issues.length > 2 ? fetchIssueData(issues[2], 'w') : Promise.resolve([]);
    const fetchSource4 = issues.length > 3 ? fetchIssueData(issues[3], 'w') : Promise.resolve([]);
    const fetchSource5 = issues.length > 4 ? fetchIssueData(issues[4], 'w') : Promise.resolve([]);
    const fetchSource6 = issues.length > 5 ? fetchIssueData(issues[5], 'w') : Promise.resolve([]);
    const fetchSource7 = issues.length > 6 ? fetchIssueData(issues[6], 'w') : Promise.resolve([]);

    const allData = await Promise.all([
      fetchSource1,
      fetchSource2,
      fetchSource3,
      fetchSource4,
      fetchSource5,
      fetchSource6,
      fetchSource7,
    ]);

    let WTSources = [];

    for (let z = 0; z < allData.length; z++) {
      const tempObj = allData[z];
      if (tempObj.length > 0) {
        WTSources = WTSources.concat(tempObj);
      }
    }

    for (const WTSource of WTSources) {
      const weekSource = mergedSources.find((MWBSource) => MWBSource.mwb_week_date === WTSource.w_study_date);
      if (weekSource) {
        Object.assign(weekSource, WTSource);
      }

      if (!weekSource) {
        mergedSources.push(WTSource);
      }
    }
  }

  for (const weekSource of mergedSources) {
    if (weekSource.mwb_week_date) {
      weekSource.week_date = weekSource.mwb_week_date;
      delete weekSource.mwb_week_date;
    }

    if (weekSource.w_study_date) {
      weekSource.week_date = weekSource.w_study_date;
      delete weekSource.w_study_date;
    }
  }

  return mergedSources;
};

describe('Live download enhanced parsing', async () => {
  for (let i = 0; i < list.length; i++) {
    const { language } = list[i];

    it(`Test live download from jw.org for ${language} language`, async () => {
      const mergedSources = await fetchData(language);
      expect(mergedSources).to.be.an('array').to.have.lengthOf.above(0);
    });
  }
});
