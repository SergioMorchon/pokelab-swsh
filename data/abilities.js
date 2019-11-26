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

const byName = abilities.reduce((acc, { name }, index) => {
	acc[name] = index;
	return acc;
}, {});

export const getAbilityByName = name => {
	console.assert(name in byName, `Ability name '${name}' exists`);
	return byName[name];
};
