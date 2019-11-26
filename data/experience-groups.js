import { readFileSync } from 'fs';

export const groups = readFileSync(
	'./data/raw/experience_groups.txt',
	'utf-8',
).split(/\r?\n/);

const byName = groups.reduce((acc, name, index) => {
	acc[name] = index;
	return acc;
}, {});

export default groups;

export const getExperienceGroupByName = name => {
	console.assert(name in byName, `Experience group ${name} not found`);
	return byName[name];
};
