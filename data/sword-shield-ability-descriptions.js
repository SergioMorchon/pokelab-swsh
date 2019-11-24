import { readFileSync } from "fs";

export const sword_shield_ability_descriptions = readFileSync(
  "./data/raw/sword_shield_ability_descriptions.txt",
  "utf-8"
)
  .split(/\r?\n/)
  .slice(1)
  .reduce((acc, s, id) => {
    const [name, description] = s.split("\t");
    acc[id] = { name, description };
    return acc;
  }, {});

const byName = Object.entries(sword_shield_ability_descriptions).reduce(
  (acc, [key, { name }]) => {
    acc[name] = key;
    return acc;
  },
  {}
);

export const getAbilityByName = name => {
  console.assert(name in byName, `Ability name '${name}' exists`);
  return byName[name];
};
