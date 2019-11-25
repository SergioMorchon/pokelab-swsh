import {
  NATIONAL_ID_OFFSET,
  GALAR_ID_OFFSET,
  BASE_STATS_OFFSET,
  EV_YIELD_OFFSET,
  ABILITIES_OFFSET,
  TYPES_OFFSET,
  EGG_GROUPS_OFFSET,
  EXP_GROUP_OFFSET,
  HATCH_CYCLES_OFFSET,
  BLOCK_SIZE
} from "./pokemon-stats-offsets";
import {
  ALL_STATS,
  HP,
  ATTACK,
  DEFENSE,
  SPECIAL_ATTACK,
  SPECIAL_DEFENSE,
  SPEED
} from "./stat";

interface IPokemonStat {
  readonly nationalId: number;
  readonly galarId: number | null;
  readonly baseStats: readonly number[];
  readonly evYields: readonly number[];
  // readonly abilities: readonly number[];
  // readonly types: readonly number[];
  // readonly eggGroups: readonly number[];
  // readonly expGroup: number;
  // readonly hatchCycles: number;
}

export const init = (buffer: ArrayBuffer) => ({
  get(index: number): IPokemonStat {
    const data = new DataView(buffer, index * BLOCK_SIZE);
    return {
      nationalId: data.getUint16(NATIONAL_ID_OFFSET, true),
      galarId: data.getUint16(GALAR_ID_OFFSET, true) || null,
      baseStats: ALL_STATS.map(stat => data.getUint8(BASE_STATS_OFFSET + stat)),
      evYields: ALL_STATS.map(stat => data.getUint8(EV_YIELD_OFFSET + stat))
    };
  }
});
