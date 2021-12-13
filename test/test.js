const loadEPUB = require('../index');
const fs = require('fs');

fs.readFile('test/mwb_MG_202111.epub', (err, data) => {
  if (err) {
    console.error(err);
    return
  }
  loadEPUB(data.buffer)
  .then(() => console.log("Passed"));
})