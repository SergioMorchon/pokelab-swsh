import { readFileSync } from 'fs';

const abilities = readFileSync(
	'./data/raw/sword_shield_ability_descriptions.txt',
	'utf-8',
)
	.split(/\r?\n/)
	.slice(1)
	.map(s => {
		const [name, description] = s.split('\t');
		return { name, description };
	});

export default abilities;

/** @type {Object<string, number>} */
const byName = abilities.reduce((acc, { name }, index) => {
	acc[name] = index;
	return acc;
}, {});

/**
 * @param {string} name
 */
export const getAbilityByName = name => {
	console.assert(name in byName, `Ability name '${name}' exists`);
	return byName[name];
};
