import { loadEPUB } from '../src/node/index.js';

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

export const fetchData = async (language, issue, pub) => {
  let data = [];

  const url = JW_CDN + new URLSearchParams({ langwritten: language, pub, output: 'json', issue });

  const res = await fetch(url);

  if (res.status === 200) {
    const result = await res.json();
    const hasEPUB = result.files[language].EPUB;

    const issueFetch = { issueDate: issue, currentYear: issue.substring(0, 4), language, hasEPUB: hasEPUB };

    data = await fetchIssueData(issueFetch, pub);
  }

  return data;
};
