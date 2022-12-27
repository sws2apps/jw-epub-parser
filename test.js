import { loadEPUB } from './src/node/index.js';

const data = await loadEPUB('./test/enhancedParsing/mwb_MG_202303.epub');

console.log(data);
