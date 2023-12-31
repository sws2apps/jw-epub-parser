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
		count = htmlItem.querySelectorAll('h3.du-color--maroon-600').length - 1;
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

			if (!isSong) {
				isSong = h3.querySelector('.dc-icon--music') ? true : false;
			}

			let data = '';

			data = h3.textContent;

			if (isSong) {
				data = data.replace('|', '@');
			}

			src += '@' + data;
			const nextElement = h3.nextElementSibling;
			if (nextElement) {
				const tmp = nextElement.querySelector('.du-color--textSubdued');
				if (tmp) {
					const firstP = tmp.querySelector('p')!;
					src += ' ' + firstP.textContent;
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

export const getWSTudySongs = async ({ htmlItem, zip }: { htmlItem: HTMLElement; zip: JSZip }) => {
	const articleLink = htmlItem.nextElementSibling!.querySelector('a')!.getAttribute('href') as string;
	const article = await getHTMLWTArticleDoc(zip, articleLink);

	if (article) {
		let songText;
		const themeScrp = article.querySelector('.themeScrp')!;
		songText = themeScrp.nextElementSibling;

		if (songText === null) {
			const firstSongContainer = article.querySelector('.du-color--textSubdued')!;
			songText = firstSongContainer.querySelector('p');
		}

		const WTOpeningSong = extractSongNumber(songText!.textContent);

		const blockTeach = article.querySelector('.blockTeach');
		if (blockTeach !== null) {
			songText = blockTeach.nextElementSibling;
		}

		if (blockTeach === null) {
			const artDivs = article.querySelectorAll('.du-color--textSubdued');
			songText = artDivs.slice(-1)[0].querySelector('p');
		}

		const WTConcludingSong = extractSongNumber(songText!.textContent);

		return { WTOpeningSong, WTConcludingSong };
	}
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
