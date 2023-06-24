import { fileDialog } from 'file-select-dialog';
import { loadEPUB } from 'jw-epub-parser';
import JSONFormatter from 'json-formatter-js';

function App() {
  const handleOpenMWBEPUB = async () => {
    try {
      const file = await fileDialog({
        accept: '.epub',
        strict: true,
      });

      const data = await loadEPUB(file);
      const formatter = new JSONFormatter(data);

      const result = document.querySelector('#mwb_parser_result');
      result.innerHTML = '';
      result.appendChild(formatter.render());
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenWEPUB = async () => {
    try {
      const file = await fileDialog({
        accept: '.epub',
        strict: true,
      });

      const data = await loadEPUB(file);
      const formatter = new JSONFormatter(data);

      const result = document.querySelector('#w_parser_result');
      result.innerHTML = '';
      result.appendChild(formatter.render());
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>JW EPUB Parser (in the browser)</h1>
      <h3>Meeting Workbook Data</h3>
      <button onClick={handleOpenMWBEPUB} type='button'>
        Import EPUB
      </button>
      <div id='mwb_parser_result' style={{ marginTop: '20px' }}></div>
      <h3>Watchtower Study Data</h3>
      <button onClick={handleOpenWEPUB} type='button'>
        Import EPUB
      </button>
      <div id='w_parser_result' style={{ marginTop: '20px' }}></div>
    </div>
  );
}

export default App;
