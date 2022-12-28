import fs from 'fs';
import { expect } from 'chai';
import { loadEPUB } from '../dist/node/index.js';

const dir = await fs.promises.opendir('./test/standardParsing');
let finalDir = [];
for await (const dirent of dir) {
  finalDir.push(dirent.name);
}

for (let i = 0; i < finalDir.length; i++) {
  const epubName = finalDir[i];

  let data = await loadEPUB(`./test/standardParsing/${epubName}`);
  let fixture = (await import(`./fixtures/${epubName.replace('.epub', '.js')}`)).default;

  describe(`Test loadEPUB function with standard parsing for ${epubName}`, () => {
    it(`mwbYear should return ${fixture.mwbYear}`, () => {
      expect(data.mwbYear).to.equal(fixture.mwbYear);
    });

    it(`weeksCount should return ${fixture.weeksCount}`, () => {
      expect(data.weeksCount).to.equal(fixture.weeksCount);
    });

    for (let a = 0; a < fixture.weeksData.length; a++) {
      const week = fixture.weeksData[a];

      for (let [key, value] of Object.entries(week)) {
        value = value.replaceAll(/\u00A0/g, ' ');
        it(`${key} should exists and return ${value}`, () => {
          expect(data.weeksData[a]).to.have.property(key).equal(value);
        });
      }
    }
  });
}
