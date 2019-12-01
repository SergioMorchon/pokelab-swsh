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
import dataView, { DataView } from './data-view';

type Texts = {
	getName(index: number): string;
	getDescription(index: number): string;
};

const pokemonStat = (index: number, data: DataView, texts: Texts) => ({
	get name(): string {
		return texts.getName(index);
	},
	get description(): string {
		return texts.getDescription(index);
	},
	get galarId(): number | null {
		return data.getUint16(GALAR_ID_OFFSET) || null;
	},
	get baseStats(): readonly number[] {
		return ALL_STATS.map(stat => data.getUint8(BASE_STATS_OFFSET + stat));
	},
	get evYields(): readonly number[] {
		const evYieldsRaw = data.getUint16(EV_YIELD_OFFSET);
		return ALL_STATS.map(
			stat => (evYieldsRaw & (0b11 << (stat * 2))) >> (stat * 2),
		).reverse();
	},
	get abilities(): readonly number[] {
		return [
			data.getUint16(ABILITIES_OFFSET),
			data.getUint16(ABILITIES_OFFSET + 2),
			data.getUint16(ABILITIES_OFFSET + 4),
		];
	},
	get types(): readonly number[] {
		const t1 = data.getUint8(TYPES_OFFSET);
		const t2 = data.getUint8(TYPES_OFFSET + 1);
		return t1 !== t2 ? [t1, t2] : [t1];
	},
	get eggGroups(): readonly number[] {
		const eggGroupsRaw = data.getUint8(EGG_GROUPS_OFFSET);
		const g1 = (eggGroupsRaw & 0xf0) >> 4;
		const g2 = eggGroupsRaw & 0x0f;
		return g1 !== g2 ? [g1, g2] : [g1];
	},
	get expGroup(): number {
		return data.getUint8(EXP_GROUP_OFFSET);
	},
	get hatchCycles(): number {
		return data.getUint8(HATCH_CYCLES_OFFSET);
	},
});

export type PokemonStats = ReturnType<typeof pokemonStat>;

export default (buffer: ArrayBuffer, texts: Texts) => ({
	get(index: number) {
		return pokemonStat(index, dataView(buffer, index * BLOCK_SIZE), texts);
	},
	get length() {
		return buffer.byteLength / BLOCK_SIZE;
	},
});
