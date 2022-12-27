import { loadEPUB } from './src/node/index.js';

const dataE = await loadEPUB('./mwb_E_202303.epub');
const dataF = await loadEPUB('./mwb_F_202303.epub');
const dataMG = await loadEPUB('./mwb_MG_202303.epub');
