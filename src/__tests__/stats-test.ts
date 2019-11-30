import pokemonStats from '../pokemon-stats';
import * as Types from '../types';
import * as EggGroups from '../egg-groups';
import * as ExpGroups from '../experience-groups';
import { readFileSync } from 'fs';

const { buffer } = readFileSync('dist/data/pokemon-stats');
const names = readFileSync('dist/data/pokemon-names-en.txt', 'utf-8').split(
	'\n',
);
const dex = pokemonStats(buffer, {
	getName: index => names[index],
	getDescription: () => '',
});

[
	{
		index: 0,
		expectedStats: {
			name: 'Bulbasaur',
			galarId: null,
			baseStats: [45, 49, 49, 65, 65, 45],
			evYields: [0, 0, 0, 1, 0, 0],
			types: [Types.Grass, Types.Poison],
			abilities: [
				// Overgrow
				64,
				// Overgrow
				64,
				// Chlorophyll
				33,
			],
			eggGroups: [EggGroups.Monster, EggGroups.Grass],
			expGroup: ExpGroups.MediumSlow,
			hatchCycles: 20,
		},
	},
	{
		index: 320,
		expectedStats: {
			name: 'Spritzee',
			galarId: 212,
			baseStats: [78, 52, 60, 63, 65, 23],
			evYields: [1, 0, 0, 0, 0, 0],
			types: [Types.Fairy],
			abilities: [
				// Healer
				130,
				// Healer
				130,
				// Aroma Veil
				164,
			],
			eggGroups: [EggGroups.Fairy],
			expGroup: ExpGroups.MediumFast,
			hatchCycles: 20,
		},
	},
].forEach(({ index, expectedStats }) => {
	const pokemonStats = dex.get(index);
	Object.keys(expectedStats).forEach(property => {
		test(`get(${index}).${property}`, () => {
			expect(pokemonStats[property]).toStrictEqual(expectedStats[property]);
		});
	});
});
