import pokemonStats from '../pokemon-stats';
import * as Types from '../types';
import * as EggGroups from '../egg-groups';
import * as ExpGroups from '../experience-groups';
import { readFileSync } from 'fs';

const { buffer } = readFileSync('dist/data/pokemon-stats');
const names = readFileSync('dist/data/pokemon-names-en.txt', 'utf-8').split(
	'\n',
);
const dex = pokemonStats(new Uint8Array(buffer), {
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
		index: 415,
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
	{
		index: 67,
		expectedStats: {
			name: 'Slowpoke 1',
			galarId: null,
			baseStats: [90, 65, 65, 40, 40, 15],
			evYields: [1, 0, 0, 0, 0, 0],
			types: [Types.Psychic],
			abilities: [
				// Gluttony
				81,
				// Own Tempo
				19,
				// Regenerator
				143,
			],
			eggGroups: [EggGroups.Monster, EggGroups.Water1],
			expGroup: ExpGroups.MediumFast,
			hatchCycles: 20,
		},
	},
	{
		index: 641,
		expectedStats: {
			name: 'Zarude 1',
			galarId: null,
			baseStats: [105, 120, 105, 70, 95, 105],
			evYields: [0, 3, 0, 0, 0, 0],
			types: [Types.Dark, Types.Grass],
			abilities: [
				// Leaf Guard
				101,
				// Leaf Guard
				101,
				// Leaf Guard
				101,
			],
			eggGroups: [EggGroups.Undiscovered],
			expGroup: ExpGroups.Slow,
			hatchCycles: 120,
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
