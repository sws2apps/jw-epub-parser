export const getMWBWeekDate = (htmlItem, fromHTML) => {
	const wdHtml = fromHTML
		? htmlItem.querySelector('article').querySelector('header').querySelector('h1')
		: htmlItem.getElementsByTagName('h1').item(0);
	const weekDate = wdHtml.textContent.replaceAll(/\u00A0/g, ' ');

	return weekDate;
};

export const getMWBWeeklyBibleReading = (htmlItem, fromHTML) => {
	const wbHtml = fromHTML
		? htmlItem.querySelector('article').querySelector('header').querySelector('h2')
		: htmlItem.getElementsByTagName('h2').item(0);
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
