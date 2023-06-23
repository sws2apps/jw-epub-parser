import { fetchData } from './sample.js';

const runLiveCommand = async () => {
  const issueIndex = process.argv.indexOf('--issue');
  if (issueIndex === -1) {
    console.error('issue date missing from arguments');
    return;
  }

  const languageIndex = process.argv.indexOf('--language');
  if (languageIndex === -1) {
    console.error('language missing from arguments');
    return;
  }

  const pubIndex = process.argv.indexOf('--pub');
  if (pubIndex === -1) {
    console.error('pub type missing from arguments');
    return;
  }

  const issue = process.argv[issueIndex + 1];
  const language = process.argv[languageIndex + 1];
  const pub = process.argv[pubIndex + 1];

  const data = await fetchData(language, issue, pub);

  console.log(data);
};

runLiveCommand();
