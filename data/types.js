import { readFileSync } from 'fs';

const types = readFileSync('./data/raw/types.txt', 'utf-8').split(/\r?\n/);

export default types;

/** @type {Object<string, number>} */
const byName = types.reduce((acc, typeName, index) => {
	acc[typeName] = index;
	return acc;
}, {});

/**
 * @param {string} name
 */
export const getTypeByName = name => {
	console.assert(name in byName, `Type name '${name}' exists`);
	return byName[name];
};
