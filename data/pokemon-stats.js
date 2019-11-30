import { readFileSync } from 'fs';
import { getMoveByName } from './moves.js';
import { getAbilityByName } from './abilities.js';
import { getTypeByName } from './types.js';
import { getEggGroupByName } from './egg-groups.js';
import { getExperienceGroupByName } from './experience-groups.js';
import {
	GALAR_ID_OFFSET,
	BASE_STATS_OFFSET,
	EV_YIELD_OFFSET,
	ABILITIES_OFFSET,
	TYPES_OFFSET,
	EGG_GROUPS_OFFSET,
	EXP_GROUP_OFFSET,
	HATCH_CYCLES_OFFSET,
	BLOCK_SIZE,
} from '../src/pokemon-stats-offsets.js';

const ids = new Set([]);

const pkms = readFileSync('./data/raw/sword_shield_stats.txt', 'utf-8')
	.split('======')
	.filter(Boolean)
	.map(s => {
		let lines = s.trim().split(/\r?\n/);
		const pkm = {};
		const [header, galarDex, baseStats, evYield, abilities, type] = lines;
		lines = lines.slice(6);
		const [id, name] = header.split(' - ');
		console.assert(!ids.has(id), `Duplicated pokemon ID ${id}`);
		ids.add(id);

		pkm.id = Number(id);
		pkm.name = name.split(/ \(Stage: \d+\)/)[0];
		pkm.galarDex =
			galarDex === 'Galar Dex: Foreign'
				? null
				: Number(galarDex.replace('Galar Dex: #', ''));
		pkm.baseStats = baseStats
			.replace('Base Stats: ', '')
			.replace(/ \(BST: \d+\)/, '')
			.split('.')
			.slice(0, 6)
			.map(Number);
		pkm.evYield = evYield
			.replace('EV Yield: ', '')
			.split('.')
			.map(Number);
		pkm.abilities = abilities
			.replace('Abilities: ', '')
			.split(' | ')
			.reduce((acc, s) => {
				const match = /(.*) \((.)\)/.exec(s);
				const index = match[2] === 'H' ? 2 : Number(match[2]) - 1;
				acc[index] = getAbilityByName(match[1]);
				return acc;
			}, new Array(3));
		pkm.types = type
			.replace('Type: ', '')
			.split(' / ')
			.map(getTypeByName);
		const items = {
			items: lines
				.filter(s => s.startsWith('Item '))
				.reduce((acc, s) => {
					const [, percentage, name] = /Item \d \((\d+)%\): (.*)/.exec(s);
					if (name !== 'None') {
						acc[name] = (name in acc ? acc[name] : 0) + percentage / 100;
					}

					return acc;
				}, {}),
		};
		lines = lines.slice(Object.keys(items.items).length ? 3 : 1);
		pkm.items = items;
		const [expGroup, eggGroup, hatchCycles] = lines;
		lines = lines.slice(4);
		pkm.expGroup = getExperienceGroupByName(
			expGroup.replace('EXP Group: ', ''),
		);
		pkm.eggGroups = eggGroup
			.replace('Egg Group: ', '')
			.split(' / ')
			.map(getEggGroupByName);
		pkm.hatchCycles = Number(hatchCycles.replace('Hatch Cycles: ', ''));

		const levelUpMoves = [];
		if (lines[0] === 'Level Up Moves:') {
			lines = lines.slice(1);
			let i = 0;
			for (; i < lines.length; i++) {
				const m = /- \[(\d+)\] (.*)/.exec(lines[i]);
				if (!m) {
					break;
				}

				const [, level, name] = m;
				levelUpMoves.push([Number(level), getMoveByName(name)]);
			}

			lines = lines.slice(i);
		}

		pkm.levelUpMoves = levelUpMoves;

		const eggMoves = [];
		if (lines[0] === 'Egg Moves:') {
			lines = lines.slice(1);
			let i = 0;
			for (; i < lines.length; i++) {
				const m = /- (.*)/.exec(lines[i]);
				if (!m) {
					break;
				}

				const [, name] = m;
				eggMoves.push(getMoveByName(name));
			}

			lines = lines.slice(i);
		}

		pkm.eggMoves = eggMoves;

		const tms = [];
		if (lines[0] === 'TMs:') {
			lines = lines.slice(1);
			let i = 0;
			for (; i < lines.length; i++) {
				const m = /- \[TM(\d+)\] (.*)/.exec(lines[i]);
				if (!m) {
					break;
				}

				const [, number] = m;
				tms.push(Number(number));
			}

			lines = lines.slice(i);
		}

		pkm.tms = tms;

		const trs = [];
		if (lines[0] === 'TRs:') {
			lines = lines.slice(1);
			let i = 0;
			for (; i < lines.length; i++) {
				const m = /- \[TR(\d+)\] (.*)/.exec(lines[i]);
				if (!m) {
					break;
				}

				const [, number] = m;
				trs.push(Number(number));
			}

			lines = lines.slice(i);
		}

		pkm.trs = trs;

		return pkm;
	});

export default pkms;

export const serializeStats = () =>
	new DataView(
		pkms.reduce((buffer, pkm, index) => {
			const data = new DataView(buffer, index * BLOCK_SIZE, BLOCK_SIZE);
			data.setUint16(GALAR_ID_OFFSET, pkm.galarDex, true);
			pkm.baseStats.forEach((stat, index) => {
				data.setUint8(BASE_STATS_OFFSET + index, stat);
			});
			data.setUint16(
				EV_YIELD_OFFSET,
				pkm.evYield.reduce((acc, ev) => (acc << 2) | ev, 0),
				true,
			);
			pkm.abilities.forEach((ability, index) => {
				data.setUint16(ABILITIES_OFFSET + index * 2, ability, true);
			});
			data.setUint8(TYPES_OFFSET, pkm.types[0]);
			data.setUint8(
				TYPES_OFFSET + 1,
				pkm.types.length === 2 ? pkm.types[1] : pkm.types[0],
			);
			data.setUint8(
				EGG_GROUPS_OFFSET,
				(pkm.eggGroups[0] << 4) |
					(pkm.eggGroups.length === 2 ? pkm.eggGroups[1] : pkm.eggGroups[0]),
			);
			data.setUint8(
				EGG_GROUPS_OFFSET + 1,
				pkm.eggGroups.length === 2 ? pkm.eggGroups[1] : pkm.eggGroups[0],
			);
			data.setUint8(EXP_GROUP_OFFSET, pkm.expGroup);
			data.setUint8(HATCH_CYCLES_OFFSET, pkm.hatchCycles);

			return buffer;
		}, new ArrayBuffer(pkms.length * BLOCK_SIZE)),
	);
