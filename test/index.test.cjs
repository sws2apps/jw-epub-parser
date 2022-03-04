require('jsdom-global')();
global.DOMParser = window.DOMParser;

const { expect } = require('chai');
const { loadEPUB } = require('../dist/index.cjs');

const expData = {
	mwbYear: '2021',
	weeksCount: 9,
	weeksData: [
		{ count: 14 },
		{ count: 14 },
		{ count: 15 },
		{ count: 14 },
		{ count: 14 },
		{ count: 14 },
		{ count: 15 },
		{ count: 14 },
		{ count: 13 },
	],
};

describe('Test loadEPUB function', () => {
	let data = [];

	before(async function () {
		this.timeout(0);
		data = await loadEPUB('./test/mwb_MG_202111.epub');
	});

	it(`mwbYear should return ${expData.mwbYear}`, async () => {
		expect(data.mwbYear).to.equal(expData.mwbYear);
	});

	it(`weeksCount should return ${expData.weeksCount}`, async () => {
		expect(data.weeksCount).to.equal(expData.weeksCount);
	});

	for (let i = 0; i <= 8; i++) {
		it(`week no. ${i + 1} properties should return ${
			expData.weeksData[i].count
		}`, async () => {
			expect(Object.keys(data.weeksData[i]).length).to.equal(
				expData.weeksData[i].count
			);
		});
	}
});
