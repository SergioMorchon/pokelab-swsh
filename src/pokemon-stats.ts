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
} from './pokemon-stats-offsets';
import { ALL_STATS } from './stat';
import { getUint16 } from './data-view';

type Texts = {
	getName(index: number): string;
	getDescription(index: number): string;
};

const pokemonStats = (index: number, data: Uint8Array, texts: Texts) => ({
	get name(): string {
		return texts.getName(index);
	},
	get description(): string {
		return texts.getDescription(index);
	},
	get galarId(): number | null {
		return getUint16(data, GALAR_ID_OFFSET) || null;
	},
	get baseStats(): readonly number[] {
		return ALL_STATS.map(stat => data[BASE_STATS_OFFSET + stat]);
	},
	get evYields(): readonly number[] {
		const evYieldsRaw = getUint16(data, EV_YIELD_OFFSET);
		return ALL_STATS.map(
			stat => (evYieldsRaw & (0b11 << (stat * 2))) >> (stat * 2),
		).reverse();
	},
	get abilities(): readonly number[] {
		return [
			getUint16(data, ABILITIES_OFFSET),
			getUint16(data, ABILITIES_OFFSET + 2),
			getUint16(data, ABILITIES_OFFSET + 4),
		];
	},
	get types(): readonly number[] {
		const t1 = data[TYPES_OFFSET];
		const t2 = data[TYPES_OFFSET + 1];
		return t1 !== t2 ? [t1, t2] : [t1];
	},
	get eggGroups(): readonly number[] {
		const eggGroupsRaw = data[EGG_GROUPS_OFFSET];
		const g1 = (eggGroupsRaw & 0xf0) >> 4;
		const g2 = eggGroupsRaw & 0x0f;
		return g1 !== g2 ? [g1, g2] : [g1];
	},
	get expGroup(): number {
		return data[EXP_GROUP_OFFSET];
	},
	get hatchCycles(): number {
		return data[HATCH_CYCLES_OFFSET];
	},
});

export type PokemonStats = ReturnType<typeof pokemonStats>;

export default (bytes: Uint8Array, texts: Texts) => ({
	get(index: number) {
		const start = index * BLOCK_SIZE;
		const end = start + BLOCK_SIZE;
		return pokemonStats(index, bytes.subarray(start, end), texts);
	},
	get length() {
		return bytes.length / BLOCK_SIZE;
	},
});
