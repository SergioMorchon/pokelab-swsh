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
import { read } from "fs";

type Texts = {
  getName(index: number): string;
  getDescription(index: number): string;
};

class PokemonStat {
  private readonly index: number;
  private readonly data: DataView;
  private readonly texts: Texts;
  constructor(index: number, data: DataView, texts: Texts) {
    this.index = index;
    this.data = data;
    this.texts = texts;
  }
  public get name(): string {
    return this.texts.getName(this.index);
  }
  public get description(): string {
    return this.texts.getDescription(this.index);
  }
  public get nationalId(): number {
    return this.data.getUint16(NATIONAL_ID_OFFSET, true);
  }
  public get galarId(): number {
    return this.data.getUint16(GALAR_ID_OFFSET, true) || null;
  }
  public get baseStats(): readonly number[] {
    return ALL_STATS.map(stat => this.data.getUint8(BASE_STATS_OFFSET + stat));
  }
  public get evYields(): readonly number[] {
    return ALL_STATS.map(stat => this.data.getUint8(EV_YIELD_OFFSET + stat));
  }
  // readonly abilities: readonly number[];
  // readonly types: readonly number[];
  // readonly eggGroups: readonly number[];
  // readonly expGroup: number;
  // readonly hatchCycles: number;
}

export default class PokemonStats {
  private readonly buffer: ArrayBuffer;
  private readonly texts: Texts;
  constructor(buffer: ArrayBuffer, texts: Texts) {
    this.buffer = buffer;
    this.texts = texts;
  }
  get(index: number) {
    return new PokemonStat(
      index,
      new DataView(this.buffer, index * BLOCK_SIZE),
      this.texts
    );
  }
  get length() {
    return this.buffer.byteLength / BLOCK_SIZE;
  }
  filter(predicate: (pokemonStat: PokemonStat) => boolean): readonly number[] {
    const result: number[] = [];
    for (let i = 0; i < this.length; i++) {
      if (predicate(this.get(i))) {
        result.push(i);
      }
    }

    return result;
  }
}
