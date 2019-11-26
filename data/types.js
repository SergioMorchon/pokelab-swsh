import { readFileSync } from "fs";

export const types = readFileSync("./data/raw/types.txt", "utf-8").split(
  /\r?\n/
);

const byName = Object.entries(types).reduce((acc, [key, name]) => {
  acc[name] = Number(key);
  return acc;
}, {});

export const getTypeByName = name => {
  console.assert(name in byName, `Type name '${name}' exists`);
  return byName[name];
};