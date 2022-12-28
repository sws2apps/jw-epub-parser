// add your language code and the month name
export const monthNames = [
	{ index: 0, names: { CIN: 'January', E: 'January', F: 'janvier', MG: 'Janoary' } },
	{ index: 1, names: { CIN: 'February', E: 'February', F: 'février', MG: 'Febroary' } },
	{ index: 2, names: { CIN: 'March', E: 'March', F: 'mars', MG: 'Martsa' } },
	{ index: 3, names: { CIN: 'April', E: 'April', F: 'avril', MG: 'Aprily' } },
	{ index: 4, names: { CIN: 'May', E: 'May', F: 'mai', MG: 'Mey' } },
	{ index: 5, names: { CIN: 'June', E: 'June', F: 'juin', MG: 'Jona' } },
	{ index: 6, names: { CIN: 'July', E: 'July', F: 'juillet', MG: 'Jolay' } },
	{ index: 7, names: { CIN: 'August', E: 'August', F: 'août', MG: 'Aogositra' } },
	{ index: 8, names: { CIN: 'September', E: 'September', F: 'septembre', MG: 'Septambra' } },
	{ index: 9, names: { CIN: 'October', E: 'October', F: 'octobre', MG: 'Oktobra' } },
	{ index: 10, names: { CIN: 'November', E: 'November', F: 'novembre', MG: 'Novambra' } },
	{ index: 11, names: { CIN: 'December', E: 'December', F: 'decembre', MG: 'Desambra' } },
];

export const tgw10Format = {
	CIN: '<<Title>>: (Mph. 10)',
	E: '<<Title>>: (10 min.)',
	F: '<<Title>> (10 min)',
	MG: '<<Title>>: (10 min.)',
};

export const tgwBibleReadingFormat = {
	CIN: 'Kuŵelenga Baibo: (Mph. 4) <<Title>> (th phunzilo <n>)',
	E: 'Bible Reading: (4 min.) <<Title>> (th study <n>)',
	F: 'Lecture de la Bible (4 min) : <<Title>> (th leçon <n>)',
	MG: 'Famakiana Baiboly: (4 min.) <<Title>> (th lesona <n>)',
};

export const assignmentsName = [
	{ CIN: 'Vidiyo ya Ulendo Woyamba', E: 'Initial Call Video', F: 'Vidéo du premier contact', MG: 'Video Fitoriana' },
	{
		CIN: 'Vidiyo ya Ulendo Wobwelelako',
		E: 'Return Visit Video',
		F: 'Vidéo de la nouvelle visite',
		MG: 'Video Fiverenana Mitsidika',
	},
	{
		CIN: 'Vidiyo Yoitanila Anthu ku Cikumbutso',
		E: 'Memorial Invitation Video',
		F: 'Vidéo d’invitation au Mémorial',
		MG: 'Video Fanasana Fahatsiarovana',
	},
	{ CIN: 'Ulendo Woyamba', E: 'Initial Call', F: 'Premier contact', MG: 'Fitoriana' },
	{ CIN: 'Ulendo Wobwelelako', E: 'Return Visit', F: 'Nouvelle visite', MG: 'Fiverenana Mitsidika' },
	{ CIN: 'Phunzilo la Baibo', E: 'Bible Study', F: 'Cours biblique', MG: 'Fampianarana Baiboly' },
	{ CIN: 'Nkhani', E: 'Talk', F: 'Discours', MG: 'Lahateny' },
	{ CIN: 'Kuitanila Anthu ku Cikumbutso', E: 'Memorial Invitation', F: 'Invitation au Mémorial', MG: 'Fanasana Fahatsiarovana' },
];

export const assignmentsFormat = {
	CIN: '<AssignmentType>: (Mph. <n>) <<Title>> (th phunzilo <n>)',
	E: '<AssignmentType>: (<n> min.) <<Title>> (th study <n>)',
	F: '<AssignmentType> (<n> min) : <<Title>> (th leçon <n>)',
	MG: '<AssignmentType>: (<n> min.) <<Title>> (th lesona <n>)',
};

export const livingPartsFormat = {
	CIN: '<<Title>>: (Mph. <n>) @Description@',
	E: '<<Title>>: (<n> min.) @Description@',
	F: '<<Title>> (<n> min) : @Description@',
	MG: '<<Title>>: (<n> min.) @Description@',
};

export const cbsFormat = {
	CIN: 'Phunzilo la Baibo la Mpingo: (Mph. 30) <<Title>>',
	E: 'Congregation Bible Study: (30 min.) <<Title>>',
	F: 'Étude biblique de l’assemblée (30 min) : <<Title>>',
	MG: 'Fianarana Baiboly: (30 min.) <<Title>>',
};
