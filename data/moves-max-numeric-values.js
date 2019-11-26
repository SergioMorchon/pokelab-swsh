const moves = require('./json/sword-shield-move-info.json');

const props = [
	'type',
	'quality',
	'category',
	'power',
	'accuracy',
	'PP',
	'priority',
	'hitMin',
	'hitMax',
	'inflict',
	'inflictPercent',
	'rawInflictCount',
	'turnMin',
	'turnMax',
	'critStage',
	'flinch',
	'effectSequence',
	'recoil',
	'rawHealing',
	'rawTarget',
	'stat1',
	'stat2',
	'stat3',
	'stat1Stage',
	'stat2Stage',
	'stat3Stage',
	'stat1Percent',
	'stat2Percent',
	'stat3Percent',
	'gigantimaxPower',
	'healing',
];

process.stdout.write(
	JSON.stringify(
		Object.values(moves).reduce((acc, move) => {
			props.reduce((acc, prop) => {
				acc[prop] = Math.max(acc[prop] || 0, move[prop]);
				return acc;
			}, acc);
			return acc;
		}, {}),
		null,
		'\t',
	),
);
