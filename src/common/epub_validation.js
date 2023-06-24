export const isMWBEpub = (name) => {
  let regex = /^mwb_[A-Z][A-Z]?[A-Z]?_202\d(0[1-9]|1[0-2])\.epub$/i;
  return regex.test(name);
};

export const isWEpub = (name) => {
  let regex = /^w_[A-Z][A-Z]?[A-Z]?_202\d(0[1-9]|1[0-2])\.epub$/i;
  return regex.test(name);
};

export const validateInput = (input) => {
  if (!input) {
    throw new Error('You did not pass anything to the loadEPUB function.');
  }
};

export const getInputType = (input) => {
  const result = { browser: false, node: true };

  if (input.name || input.url || input.htmlRaws) {
    result.browser = true;
  }

  return result;
};

export const getEPUBFileName = (input) => {
  const filename = input.name || input.url || input;
  return window.path.basename(filename);
};

export const isValidEPUB = (input) => {
  const epubFilename = getEPUBFileName(input);
  const isMWB = isMWBEpub(epubFilename);
  const isW = isWEpub(epubFilename);

  return isMWB || isW;
};

export const isValidEPUBIssue = (input) => {
  let valid = true;

  const epubFilename = getEPUBFileName(input);
  const isMWB = isMWBEpub(epubFilename);
  const isW = isWEpub(epubFilename);

  const type = isMWB ? 'mwb' : isW ? 'w' : undefined;

  const issue = +epubFilename.split('_')[2].split('.epub')[0];

  if (type === 'mwb' && issue < 202207) valid = false;
  if (type === 'w' && issue < 202304) valid = false;

  return valid;
};

export const getEPUBYear = (input) => {
  const filename = getEPUBFileName(input);
  return filename.split('_')[2].substring(0, 4);
};

export const getEPUBLanguage = (input) => {
  const filename = getEPUBFileName(input);
  return filename.split('_')[1];
};

export const getEPUBData = async (input) => {
  if (input.name) {
    return input;
  }

  if (input.url) {
    const epubRes = await window.fetch(input.url);
    if (epubRes.status !== 200) {
      throw new Error('EPUB file could not be downloaded. Check the URL you provided.');
    }
    const epubData = await epubRes.blob();
    const data = await epubData.arrayBuffer();

    return data;
  }

  const data = await window.readFile(input);
  return data;
};
