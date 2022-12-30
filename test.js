import { loadEPUB } from './src/node/index.js';

const JW_CDN = 'https://app.jw-cdn.org/apis/pub-media/GETPUBMEDIALINKS?';

const language = 'VZ';
const issueDate = '202303';

const url =
	JW_CDN +
	new URLSearchParams({
		langwritten: language,
		pub: 'mwb',
		fileformat: 'epub',
		output: 'json',
		issue: issueDate,
	});

const res = await fetch(url);
if (res.status === 200) {
	const data = await res.json();
	const epubFile = data.files[language].EPUB[0].file;
	const epubUrl = epubFile.url;

	const epubData = await loadEPUB({ url: epubUrl });

	console.log(epubData);
} else {
	console.log('not found');
}
