import { writeFileSync, existsSync, mkdirSync } from 'fs';
import types from './types.js';
import moves from './moves.js';
import { serialize as serializeTms } from './moves-tm-list.js';
import { serialize as serializeTrs } from './moves-tr-list.js';
import abilities from './abilities.js';
import pokemonStats, { serializeStats } from './pokemon-stats.js';
import eggGroups from './egg-groups.js';
import experienceGroups from './experience-groups.js';
import serializeEnum from './serialize-enum.js';
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
const writeTypeScript = (fileName, lines) =>
	writeFileSync(
		join(process.cwd(), 'src', `${fileName}.ts`),
		lines.join('\n') + '\n',
		'utf-8',
	);

// TODO: split JSON to appropiate formats
writeJson('movements', moves);

// Binaries
writeBinary('moves-tms', serializeTms());
writeBinary('moves-trs', serializeTrs());
writeBinary('pokemon-stats', serializeStats());

// Texts
writeLines(
	'ability-names-en',
	abilities.map(({ name }) => name),
);
writeLines(
	'ability-descriptions-en',
	abilities.map(({ description }) => description),
);
writeLines(
	'pokemon-names-en',
	pokemonStats.map(({ name }) => name),
);

// Enums
writeTypeScript('types', serializeEnum(types));
writeTypeScript('egg-groups', serializeEnum(eggGroups));
writeTypeScript('experience-groups', serializeEnum(experienceGroups));
