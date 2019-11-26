import PokemonStats from "../pokemon-stats";
import { readFileSync } from "fs";

const { buffer } = readFileSync("dist/data/pokemon-stats");
const names = JSON.parse(
  readFileSync("dist/data/pokemon-names-en.json", "utf-8")
);
const dex = new PokemonStats(buffer, {
  getName: index => names[index],
  getDescription: () => ""
});

[
  {
    index: 0,
    expectedStats: {
      name: "Bulbasaur",
      nationalId: 1,
      galarId: null,
      baseStats: [45, 49, 49, 65, 65, 45],
      evYields: [0, 0, 0, 1, 0, 0]
    }
  },
  {
    index: 320,
    expectedStats: {
      name: "Spritzee",
      nationalId: 682,
      galarId: 212,
      baseStats: [78, 52, 60, 63, 65, 23],
      evYields: [1, 0, 0, 0, 0, 0]
    }
  }
].forEach(({ index, expectedStats }) =>
  test(`get(${index})`, () => {
    const pokemonStats = dex.get(index);
    Object.keys(expectedStats).forEach(key => {
      expect(pokemonStats[key]).toStrictEqual(expectedStats[key]);
    });
  })
);
