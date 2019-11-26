import { writeFileSync, existsSync, mkdirSync } from 'fs';
import types from './types.js';
import moves from './moves.js';
import { serialize as serializeTms } from './moves-tm-list.js';
import { serialize as serializeTrs } from './moves-tr-list.js';
import abilities from './abilities.js';
import pokemonStats, { serializeStats } from './pokemon-stats.js';
import eggGroups from './egg-groups.js';
import experienceGroups from './experience-groups.js';
import { join } from 'path';

const distPath = join(process.cwd(), 'dist');
const dataDistPath = join(distPath, 'data');

if (!existsSync(distPath)) {
	mkdirSync(distPath);
}

if (!existsSync(dataDistPath)) {
	mkdirSync(dataDistPath);
}

const writeJson = (fileName, data) =>
	writeFileSync(
		join(dataDistPath, `${fileName}.json`),
		JSON.stringify(data, null, '\t'),
	);
const writeBinary = (fileName, data) =>
	writeFileSync(join(dataDistPath, `${fileName}`), data);

const writeLines = (fileName, lines) =>
	writeFileSync(
		join(dataDistPath, `${fileName}.txt`),
		lines.join('\n'),
		'utf-8',
	);

writeJson('types', types);
writeJson('movements', moves);
writeBinary('tms', serializeTms());
writeBinary('trs', serializeTrs());
writeLines(
	'ability-names',
	abilities.map(({ name }) => name),
);
writeLines(
	'ability-descriptions',
	abilities.map(({ description }) => description),
);
writeJson('egg-groups', eggGroups);
writeJson('experience-groups', experienceGroups);
writeBinary('pokemon-stats', serializeStats());
writeLines(
	'pokemon-names-en',
	pokemonStats.map(({ name }) => name),
);
