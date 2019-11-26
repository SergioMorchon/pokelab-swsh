import PokemonStats from "../pokemon-stats";
import { readFileSync } from "fs";

const { buffer } = readFileSync("dist/data/sword_shield_stats");
const dex = new PokemonStats(buffer, {
  getName: () => "",
  getDescription: () => ""
});

[
  {
    index: 0,
    name: "Bulbasaur",
    expectedStats: {
      nationalId: 1,
      galarId: null,
      baseStats: [45, 49, 49, 65, 65, 45],
      evYields: [0, 0, 0, 1, 0, 0]
    }
  },
  {
    index: 320,
    name: "Spritzee",
    expectedStats: {
      nationalId: 682,
      galarId: 212,
      baseStats: [78, 52, 60, 63, 65, 23],
      evYields: [1, 0, 0, 0, 0, 0]
    }
  }
].forEach(({ index, name, expectedStats }) =>
  test(`get(${index}): ${name}`, () => {
    const pokemonStats = dex.get(index);
    Object.keys(expectedStats).forEach(key => {
      expect(pokemonStats[key]).toStrictEqual(expectedStats[key]);
    });
  })
);
