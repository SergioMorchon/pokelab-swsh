import { init } from "../pokemon-stats";
import { readFileSync } from "fs";

const { buffer } = readFileSync("dist/data/sword_shield_stats");
const dex = init(buffer);

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
  }
].forEach(({ index, name, expectedStats }) =>
  test(`get(${index}): ${name}`, () => {
    expect(dex.get(index)).toStrictEqual(expectedStats);
  })
);
