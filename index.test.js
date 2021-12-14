const loadEPUB = require('./index');

const expData = {
    mwbYear: '2021',
    weeksCount: 9,
    weeksData: [
        { count: 14},
        { count: 14},
        { count: 15},
        { count: 14},
        { count: 14},
        { count: 14},
        { count: 15},
        { count: 14},
        { count: 13},
    ]
}

test('Test loadEPUB function', done => {
    loadEPUB('test/mwb_MG_202111.epub')
    .then(data => {
        try {
            expect(data.mwbYear).toBe(expData.mwbYear);
            expect(data.weeksCount).toBe(expData.weeksCount);
            expect(Object.keys(data.weeksData[0]).length).toBe(expData.weeksData[0].count);
            expect(Object.keys(data.weeksData[1]).length).toBe(expData.weeksData[1].count);
            expect(Object.keys(data.weeksData[2]).length).toBe(expData.weeksData[2].count);
            expect(Object.keys(data.weeksData[3]).length).toBe(expData.weeksData[3].count);
            expect(Object.keys(data.weeksData[4]).length).toBe(expData.weeksData[4].count);
            expect(Object.keys(data.weeksData[5]).length).toBe(expData.weeksData[5].count);
            expect(Object.keys(data.weeksData[6]).length).toBe(expData.weeksData[6].count);
            expect(Object.keys(data.weeksData[7]).length).toBe(expData.weeksData[7].count);
            expect(Object.keys(data.weeksData[8]).length).toBe(expData.weeksData[8].count);
            done();
        } catch (error) {
            done(error);
        }
    })
})