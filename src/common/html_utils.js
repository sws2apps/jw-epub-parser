import { getHTMLWTArticleDoc } from './epub_jszip.js';
import { extractSongNumber } from './parsing_rules.js';

export const getMWBWeekDate = (htmlItem) => {
	const wdHtml = htmlItem.querySelector('h1');
	const weekDate = wdHtml.textContent.replaceAll(/\u00A0/g, ' ');

	return weekDate;
};

export const getMWBWeeklyBibleReading = (htmlItem) => {
	const wbHtml = htmlItem.querySelector('h2');
	const weeklyBibleReading = wbHtml.textContent.replaceAll(/\u00A0/g, ' ');

	return weeklyBibleReading;
};

export const getMWBAYFCount = (htmlItem) => {
	return htmlItem.querySelector('#section3').querySelectorAll('li').length;
};

export const getMWBLCCount = (htmlItem) => {
	const itemsCn = htmlItem.querySelector('#section4').querySelectorAll('li').length;
	return itemsCn === 6 ? 2 : 1;
};

export const getMWBSources = (htmlItem) => {
	let src = '';

	// get elements with meeting schedule data: pGroup
	const pGroupData = htmlItem.querySelectorAll('.pGroup');
	pGroupData.forEach((pGroup) => {
		const liData = pGroup.querySelectorAll('li');
		liData.forEach((li) => {
			const firstP = li.querySelector('p');
			src += '|' + firstP.textContent;
		});
	});

	src = src.replaceAll(/\u00A0/g, ' '); // remove non-breaking space

	return src;
};

export const getWStudyArticles = (htmlItem) => {
	return htmlItem.querySelectorAll('h3');
};

export const getWStudyDate = (htmlItem) => {
	return htmlItem.textContent.replaceAll(/\u00A0/g, ' '); // remove non-breaking space;
};

export const getWSTudySongs = async ({ htmlItem, zip }) => {
	const articleLink = htmlItem.nextElementSibling.querySelector('a').getAttribute('href');
	const article = await getHTMLWTArticleDoc(zip, articleLink);

	if (article) {
		let songText;
		const themeScrp = article.querySelector('.themeScrp');
		songText = themeScrp.nextElementSibling;

		if (songText === null) {
			const firstSongContainer = article.querySelector('.du-color--textSubdued');
			songText = firstSongContainer.querySelector('p');
		}

		const WTOpeningSong = extractSongNumber(songText.textContent);

		const blockTeach = article.querySelector('.blockTeach');
		if (blockTeach !== null) {
			songText = blockTeach.nextElementSibling;
		}

		if (blockTeach === null) {
			const artDivs = article.querySelectorAll('.du-color--textSubdued');
			songText = artDivs.slice(-1)[0].querySelector('p');
		}

		const WTConcludingSong = extractSongNumber(songText.textContent);

		return { WTOpeningSong, WTConcludingSong };
	}
};

export const getWStudyTitle = (htmlItem) => {
	const articleLink = htmlItem.nextElementSibling.querySelector('a');
	const studyTitle = articleLink.textContent.replaceAll(/\u00A0/g, ' '); // remove non-breaking space;;

	return studyTitle;
};
