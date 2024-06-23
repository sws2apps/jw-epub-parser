import JSZip from 'jszip';
import { HTMLElement } from 'node-html-parser';
import { getHTMLWTArticleDoc } from './epub_jszip.js';
import { extractSongNumber } from './parsing_rules.js';

export const getMWBWeekDate = (htmlItem: HTMLElement) => {
  const wdHtml = htmlItem.querySelector('h1')!;
  const weekDate = wdHtml.textContent.replace(/\u00A0/g, ' ');

  return weekDate;
};

export const getMWBWeeklyBibleReading = (htmlItem: HTMLElement) => {
  const wbHtml = htmlItem.querySelector('h2')!;
  const weeklyBibleReading = wbHtml.textContent.replace(/\u00A0/g, ' ');

  return weeklyBibleReading;
};

export const getMWBAYFCount = (htmlItem: HTMLElement) => {
  let count: number = 1;

  const testSection = htmlItem.querySelector('#section3');

  //  pre-2024 mwb
  if (testSection) {
    count = testSection.querySelectorAll('li').length;
  }

  // 2024 onward
  if (!testSection) {
    count = htmlItem.querySelectorAll('.du-color--gold-700').length - 1;
  }

  return count;
};

export const getMWBLCCount = (htmlItem: HTMLElement) => {
  let count = 1;

  const testSection = htmlItem.querySelector('#section4');

  //  pre-2024 mwb
  if (testSection) {
    count = testSection.querySelectorAll('li').length;
    count = count === 6 ? 2 : 1;
  }

  // 2024 onward
  if (testSection === null) {
    const lcSection = htmlItem.querySelector('h2.du-color--maroon-600')!;
    const parent = lcSection.parentNode;

    let nextElement = parent.nextElementSibling;

    while (nextElement) {
      const h3 = nextElement.tagName === 'H3' ? nextElement : nextElement.querySelector('h3');

      if (h3 && h3.parentNode.classList.contains('boxContent') === false) {
        count++;
      }

      nextElement = nextElement.nextElementSibling;
    }

    count = count - 4;
  }

  return count;
};

export const getMWBSources = (htmlItem: HTMLElement) => {
  let src = '';

  // pre-2024 mwb
  // get elements with meeting schedule data: pGroup
  const pGroupData = htmlItem.querySelectorAll('.pGroup');
  for (const pGroup of pGroupData) {
    const liData = pGroup.querySelectorAll('li');
    for (const li of liData) {
      const firstP = li.querySelector('p')!;
      src += '@' + firstP.textContent;
    }
  }

  // 2024 onward
  // get elements with meeting schedule data: h3
  if (src.length === 0) {
    const h3Texts = htmlItem.querySelectorAll('h3');

    for (const h3 of h3Texts) {
      let isSong = h3.classList.contains('dc-icon--music');
      const part = h3.parentNode.classList.contains('boxContent') === false;

      if (!isSong) {
        isSong = h3.querySelector('.dc-icon--music') ? true : false;
      }

      if (isSong || part) {
        let data = '';

        data = h3.textContent;

        if (isSong) {
          data = data.replace('|', '@');
        }

        src += '@' + data;
        const nextElement = h3.nextElementSibling?.querySelector('p');
        if (nextElement) {
          src += ' ' + nextElement.textContent;
        }
      }
    }

    const sepBeforeBR = src.split('@', 5).join('@').length;
    src = src.substring(0, sepBeforeBR) + '@junk@junk' + src.substring(sepBeforeBR);
  }

  src = src.replace(/\u00A0/g, ' '); // remove non-breaking space

  return src;
};

export const getWStudyArticles = (htmlItem: HTMLElement) => {
  return htmlItem.querySelectorAll('h3');
};

export const getWStudyDate = (htmlItem: HTMLElement) => {
  let result: string;

  const p = htmlItem.querySelector('.desc');

  if (p === null) {
    result = htmlItem.textContent.replace(/\u00A0/g, ' '); // remove non-breaking space;
  }

  if (p !== null) {
    result = p.textContent.replace(/\u00A0/g, ' '); // remove non-breaking space;
  }

  return result!;
};

export const getWSTudySongs = (content: HTMLElement) => {
  const pubRefs = content.querySelectorAll('.pubRefs');

  const openingSongText = pubRefs.at(0)!;
  const w_study_opening_song = extractSongNumber(openingSongText.textContent) as number;

  let concludingSongText = <HTMLElement>pubRefs.at(-1);

  if (pubRefs.length === 2) {
    const blockTeach = content.querySelector('.blockTeach');
    concludingSongText = blockTeach!.nextElementSibling!;
  }

  const w_study_concluding_song = extractSongNumber(concludingSongText.textContent) as number;

  return {
    w_study_opening_song,
    w_study_concluding_song,
  };
};

export const getWStudyTitle = (htmlItem: HTMLElement) => {
  let result: string;

  const h2 = htmlItem.querySelector('h2');

  if (h2 === null) {
    const articleLink = htmlItem.nextElementSibling!.querySelector('a')!;
    result = articleLink.textContent.replace(/\u00A0/g, ' '); // remove non-breaking space;;
  }

  if (h2 !== null) {
    result = h2.textContent.trim().replace(/\u00A0/g, ' '); // remove non-breaking space;
  }

  return result!;
};
