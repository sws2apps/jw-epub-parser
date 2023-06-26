import { loadEPUB } from 'jw-epub-parser';
import JSONFormatter from 'json-formatter-js';

function App() {
	const handleOpenMWBEPUB = async (file) => {
		try {
			const data = await loadEPUB(file);
			const formatter = new JSONFormatter(data);

			const result = document.querySelector('#mwb_parser_result');
			result.innerHTML = '';
			result.appendChild(formatter.render());
		} catch (err) {
			console.error(err);
		}
	};

	const handleOpenWEPUB = async (file) => {
		try {
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
			<h1>JW EPUB Parser</h1>
			<h3>Meeting Workbook Data</h3>
			<input data-test='mwb_file' type='file' onChange={(e) => handleOpenMWBEPUB(e.target.files[0])}></input>
			<div id='mwb_parser_result' style={{ marginTop: '20px' }}></div>
			<h3>Watchtower Study Data</h3>
			<input data-test='w_file' type='file' onChange={(e) => handleOpenWEPUB(e.target.files[0])}></input>
			<div id='w_parser_result' style={{ marginTop: '20px' }}></div>
		</div>
	);
}

export default App;
