import { readFileSync } from 'fs';

export const groups = readFileSync('./data/raw/egg_groups.txt', 'utf-8').split(
	/\r?\n/,
);

const byName = groups.reduce((acc, name, index) => {
	acc[name] = index;
	return acc;
}, {});

export default groups;

export const getEggGroupByName = name => {
	console.assert(name in byName, `Egg group ${name} not found`);
	return byName[name];
};
