export const isValidEpubNaming = (name) => {
	let regex = /^mwb_[A-Z][A-Z]?[A-Z]?_202\d(0[1-9]|1[0-2])\.epub$/i;
	return regex.test(name);
};

export const isValidFilename = (name) => {
	if (name.startsWith('OEBPS') && name.endsWith('.xhtml')) {
		const fileName = name.split('/')[1].split('.')[0];
		if (!isNaN(fileName)) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
};

export const getHtmlRawString = async (zip, filename) => {
	const content = await zip.file(filename).async('string');

	return content;
};

export const isValidMwbSched = (htmlDoc) => {
	const isValidTGW = htmlDoc.querySelector(`[class*=treasures]`) ? true : false;
	const isValidAYF = htmlDoc.querySelector(`[class*=ministry]`) ? true : false;
	const isValidLC = htmlDoc.querySelector(`[class*=christianLiving]`)
		? true
		: false;

	if (isValidTGW === true && isValidAYF === true && isValidLC === true) {
		return true;
	} else {
		return false;
	}
};

export const parseEpub = (htmlDocs, mwbYear) => {
	const obj = {};
	const weeksData = [];
	let weeksCount;

	weeksCount = htmlDocs.length;

	obj.weeksCount = weeksCount;
	obj.mwbYear = mwbYear;

	for (let a = 0; a < weeksCount; a++) {
		const weekItem = {};

		const htmlItem = htmlDocs[a];

		// get week date
		const wdHtml = htmlItem.getElementsByTagName('h1').item(0);
		const weekDate = wdHtml.textContent;

		weekItem.weekDate = weekDate;

		// get weekly Bible Reading
		const wbHtml = htmlItem.getElementsByTagName('h2').item(0);
		weekItem.weeklyBibleReading = wbHtml.textContent;

		let src = '';
		let cnLC = 0;

		// get number of assignments in Apply Yourself Parts
		const cnAYF = htmlItem
			.querySelector('#section3')
			.querySelectorAll('li').length;

		// get number of assignments in Living as Christians Parts
		const lcLiLength = htmlItem
			.querySelector('#section4')
			.querySelectorAll('li').length;
		cnLC = lcLiLength === 6 ? 2 : 1;

		// get elements with meeting schedule data: pGroup
		const pGroupData = htmlItem.querySelectorAll('.pGroup');
		pGroupData.forEach((pGroup) => {
			let pgData = pGroup.querySelectorAll('p');
			pgData.forEach((p) => {
				src += '|' + p.textContent;
			});
		});

		src.replace(/\u00A0/g, ' '); // remove non-breaking space
		let toSplit = src.split('|');

		// First song
		weekItem.songFirst = toSplit[1].match(/(\d+)/)[0];

		// 10min TGW Source
		weekItem.tgw10Talk = toSplit[3].trim();

		//Bible Reading Source
		weekItem.tgwBRead = toSplit[7].trim();

		// AYF Part Count
		weekItem.ayfCount = cnAYF;

		//AYF1 Source
		weekItem.ayfPart1 = toSplit[8].trim();

		if (cnAYF > 1) {
			//AYF2 Source
			weekItem.ayfPart2 = toSplit[9].trim();
		}

		if (cnAYF > 2) {
			//AYF3 Source
			weekItem.ayfPart3 = toSplit[10].trim();
		}

		if (cnAYF > 3) {
			//AYF4 Source
			weekItem.ayfPart4 = toSplit[11].trim();
		}

		// Middle song
		let nextIndex = cnAYF > 3 ? 12 : cnAYF > 2 ? 11 : cnAYF > 1 ? 10 : 9;
		weekItem.songMiddle = toSplit[nextIndex].match(/(\d+)/)[0];

		// LC Part Count
		weekItem.lcCount = cnLC;

		// 1st LC part
		nextIndex++;
		weekItem.lcPart1 = toSplit[nextIndex].trim();

		if (cnLC === 2) {
			// 1st LC part
			nextIndex++;
			weekItem.lcPart2 = toSplit[nextIndex].trim();
		}

		// CBS Source
		nextIndex++;
		weekItem.lcCBS = toSplit[nextIndex].trim();

		// Concluding Song
		nextIndex++;
		nextIndex++;
		weekItem.songConclude = toSplit[nextIndex].match(/(\d+)/)[0];

		weeksData.push(weekItem);
	}

	obj.weeksData = weeksData;

	return obj;
};
