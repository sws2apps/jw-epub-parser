import fs from 'fs';
import * as path from 'path';
import fetch from 'node-fetch';
import { expect } from 'chai';
import { loadEPUB } from '../dist/node/index.js';

const list = JSON.parse(await fs.promises.readFile(new URL('./standardParsing/list.json', import.meta.url)));
const JW_CDN = 'https://app.jw-cdn.org/apis/pub-media/GETPUBMEDIALINKS?';

const fetchData = async (language, issue, pub) => {
  let data = [];
  let fixture = [];

  const url =
    JW_CDN +
    new URLSearchParams({
      langwritten: language,
      pub,
      fileformat: 'epub',
      output: 'json',
      issue,
    });

  const res = await fetch(url);

  if (res.status === 200) {
    const result = await res.json();
    const epubEntry = result.files[language].EPUB;

    const epubFile = epubEntry[0].file;
    const epubUrl = epubFile.url;
    const epubName = path.basename(epubUrl);
    data = await loadEPUB({ url: epubUrl });
    fixture = (await import(`./fixtures/${epubName.replace('.epub', '.js')}`)).default;
  }

  return { data, fixture };
};

describe('Testing Standard Parsing', () => {
  for (let i = 0; i < list.length; i++) {
    const { language, issue } = list[i];

    describe(`Test loadEPUB function for ${language} language`, async () => {
      it(`Parsing Meeting Workbook EPUB file`, async () => {
        const { data, fixture } = await fetchData(language, issue, 'mwb');

        for (let a = 0; a < fixture.length; a++) {
          const week = fixture[a];
          for (let [key, value] of Object.entries(week)) {
            expect(data[a]).to.have.property(key).equal(value);
          }
        }
      });

      it(`Parsing Watchtower Study EPUB file`, async () => {
        const { data, fixture } = await fetchData(language, issue, 'w');

        for (let a = 0; a < fixture.length; a++) {
          const week = fixture[a];
          for (let [key, value] of Object.entries(week)) {
            expect(data[a]).to.have.property(key).equal(value);
          }
        }
      });
    });
  }
});
