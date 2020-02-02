export type Pokemon = {
	readonly id: number;
	readonly name: string;
	readonly galarDex: number | null;
	readonly baseStats: readonly number[];
	readonly evYield: readonly number[];
	readonly abilities: readonly number[];
	readonly types: readonly number[];
	readonly items: readonly number[];
	readonly expGroup: readonly number[];
	readonly eggGroups: readonly number[];
	readonly hatchCycles: readonly number[];
	readonly levelUpMoves: readonly [readonly number, readonly number][];
	readonly eggMoves: readonly number[];
	readonly tms: readonly number[];
	readonly trs: readonly number[];
};
